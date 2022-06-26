<?php

class VievNews extends News {

  public function showAllNews($pagenumber){
    $datas = $this->getAllNews($pagenumber);
    echo json_encode($datas);
  }
  public function showOneNews($id){
    $datas = $this->getNewsById($id);
    echo json_encode($datas);
  }
  public function addNews($data){

     $this->addOneNews($data);
     http_response_code(201);
  }
  public function deleteNews($id){
    $this->deleteNewsById($id);
    http_response_code(202);
  }

  public function changeNews($data,$id){
    if(move_uploaded_file($_FILES["name"]["tmp_name"],'images/'.$_FILES["name"]["name"])){
      echo 'Файл загружен';
    }
    else{
      echo 'Ошибка загрузки файла';
    }
    $this->updateNewsById($data,$id);
  }

}