<?php

    function writing_interface_ielts_encode_exercises(){
        global $user;
        $exercises = array();
        /*
        $sql = "SELECT  e.id AS exercise_id, e.instructions, e.general_question, e.tags, e.type_id,
                        q.id AS question_id, q.question, q.feedback AS q_feedback, q.audio AS q_audio, q.audio_file AS q_audio_file,
                        a.id AS answer_id, a.answer, a.feedback AS a_feedback, a.nearmiss, a.position AS a_position, a.correct, a.audio AS a_audio, a.audio_file AS audio_file
                FROM gel_writing_interface_exercise e
                INNER JOIN gel_writing_interface_question_cloze q ON q.exercise_id = e.id
                INNER JOIN gel_writing_interface_answer_cloze a ON q.id = a.question_id
                WHERE e.project_id =16
                OR e.project_id =17
                OR e.project_id =18
                ORDER BY exercise_id, question_id ASC";
        */

       $sql = "SELECT  e.id AS exercise_id, e.instructions, e.general_question, e.tags, e.type_id,
                       q.id AS question_id, q.question, q.feedback AS q_feedback, q.audio AS q_audio, q.audio_file AS q_audio_file,
                       a.id AS answer_id, a.answer, a.feedback AS a_feedback, a.nearmiss, a.position AS a_position, a.correct, a.audio AS a_audio, a.audio_file AS audio_file, at.value AS a_tag
                FROM gel_writing_interface_exercise e
                INNER JOIN gel_writing_interface_question_cloze q ON q.exercise_id = e.id
                INNER JOIN gel_writing_interface_answer_cloze a ON q.id = a.question_id
                LEFT JOIN gel_writing_interface_answer_cloze_tag at ON a.tag = at.id
                WHERE e.project_id = 5
                ORDER BY exercise_id, question_id, a_position ASC";

        $result = db_query($sql);
        $prev_exercise = 0;
        while($row = db_fetch_object($result)){
            $curr_exercise = $row->exercise_id;

            // get tags
            // if we have 2 exercises with 10 questions each, we will have to query the database 20 times to retrieve the tags
            // the problem is that tags don't vary between questions of the same exercise so by adding this condition we will
            // query the database only 2 times instead of the initial 20
            if($curr_exercise != $prev_exercise){
                $tags_arr = explode(",", $row->tags);
                $tags = array();
                foreach($tags_arr as $tag_id){
                    $sql_tag = "SELECT t.value AS tag_value, tc.value AS category_value FROM gel_writing_interface_tag t
                            INNER JOIN gel_writing_interface_tag_category tc
                            ON t.category = tc.id AND t.id = ".$tag_id." LIMIT 1";
                    $result_tag = db_query($sql_tag);
                    $row_tag = db_fetch_object($result_tag);
                    $tags[$row_tag->category_value] = $row_tag->tag_value;
                }
            }

            // exercise details
            $exercises[$row->exercise_id]["details"] = array("instructions" => $row->instructions,
                                                             "general_question" => $row->general_question,
                                                             "tags" => $tags);
            // question details
            $exercises[$row->exercise_id]["question"][$row->question_id]["details"] = array("question" => $row->question,
                                                                                           "feedback" => $row->q_feedback,
                                                                                           "audio" => $row->q_audio,
                                                                                           "audio_file" => $row->q_audio_file);
            // answer details
            $exercises[$row->exercise_id]["question"][$row->question_id]["answers"][$row->answer_id] = array("answer" => $row->answer,
                                                                                                             "feedback" => $row->a_feedback,
                                                                                                             "nearmiss" => $row->nearmiss,
                                                                                                             "position" => $row->a_position,
                                                                                                             "correct" => $row->correct,
                                                                                                             "audio" => $row->a_audio,
                                                                                                             "audio_file" => $row->audio_file,
                                                                                                             "tag" => $row->a_tag);

            $prev_exercise = $row->exercise_id;
        }

        print(json_encode($exercises));
    }