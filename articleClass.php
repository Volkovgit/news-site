<?php 

class Article{

  
  private $description;
  private $imgName;
  private $nameArticle;

  public function __construct($nm,$desc,$img)
  {
    
    $this->description = $desc;
    $this->imgName=$img;
    $this->nameArticle=$nm;
  }

  public function saveImg($img){
    if(move_uploaded_file($img["name"]["tmp_name"],'images/'.$img["name"]["name"])){
      echo 'Файл загружен';
    }
    else{
      echo 'Ошибка загрузки файла';
    }
  }

  public function getArticle(){
    $data['name']= $this->nameArticle;
    $data['description']= $this->description;
    $data['imgName']= $this->imgName;
    return $data;
  }
}