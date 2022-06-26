<?php

class News extends Dbh {

  protected function getAllNews($pagenumber){
    $limit = 2;
    $offsetParam = $limit * $pagenumber;
    $sql = "SELECT * FROM news LIMIT $limit OFFSET $offsetParam";
    $results = $this->connects()->query($sql);
    $numRows = $results -> num_rows;

    $sql_count_rows = "SELECT * FROM news";
    $rows_count = $this->connects()->query($sql_count_rows)->num_rows / $limit;
    $rows_count = ceil($rows_count);


    if($numRows > 0){
      while($row = $results->fetch_assoc()){

        $data[] = $row;
      }
      return ["newsList"=>$data,"row_count"=>$rows_count];
    }
  }

  protected function getNewsById($id){
    $sql = "SELECT * FROM news WHERE `id`=$id";
    $results = $this->connects()->query($sql);
    $numRows = $results -> num_rows;
    if($numRows > 0){
      while($row = $results->fetch_assoc()){
        $data[] = $row;
      }
      return $data;
    }
  }

  protected function addOneNews($data)
  {
    
    $name = $data['name'];
    $date = date('Y-m-d');
    $img = 'images/'.$data['imgName'];
    $description = $data['description'];
    
    $sql = "INSERT INTO `news` (`name`, `date`, `description`, `img`) VALUES ('$name', '$date', '$description', '$img');";
    $this->connects()->query($sql);
  
  }

  protected function deleteNewsById($id){
    $sql = "DELETE FROM `news` WHERE `news`.`id` = $id";
    $this->connects()->query($sql);
    http_response_code(200);

  }

  protected function updateNewsById($data,$id)
  {
    $name = $data['name'];
    $img = 'images/'.$data['imgName'];
    $date = date('Y-m-d');
    $description = $data['description'];
    $sql = "UPDATE `news` SET `name` = '$name', `date` = '$date', `description` = '$description', `img` = '$img' WHERE `news`.`id` = $id";
    $this->connects()->query($sql);
  
    http_response_code(200);
    $res = [
      "status" => true,
      "message" => "News is updated"
    ];
    echo json_encode($res);
  }
  

}