<?php 
// для обхода CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Content-type: image/png');
header('Access-Control-Allow-Headers: x-requested-with, Content-Type, origin, authorization, accept, x-access-token');


include './connectClass.php';
include './newsClass.php';
include './showDb.php';
include './articleClass.php';

$newsList = new VievNews();



$method = $_SERVER['REQUEST_METHOD'];
$q = $_GET['q'];
$params = explode('/', $q);

$type = $params[0];
$id = $params[1];
$currentPage = $params[2];


// CORS не дает переписать на switch-case (DELETE)
if ($method === 'GET') {
  if ($type === 'news') {
    if (isset($id)) {
      $newsList->showAllNews($id);
    }
  } elseif ($type === 'getOneArticle') {
    if (isset($id)) {
      $newsList->showOneNews($id);
    }
  }
} elseif ($method === 'POST') {
  if ($type === 'news') {
    $newArticle = new Article($_POST["name"], $_POST["description"], $_FILES["name"]["name"]);
    $newArticle->saveImg($_FILES);

    $newsList->addNews($newArticle->getArticle());
  }
  if ($type === 'edit') {
    if (isset($id)) {
      $newArticle = new Article($_POST["name"], $_POST["description"], $_FILES["name"]["name"]);
      $newArticle->saveImg($_FILES);
      $newsList->changeNews($newArticle->getArticle(), $id);
    } else http_response_code(404);
  }
} elseif ($method === "DELETE") {
  if ($type === 'news') {
    if (isset($id)) {
      $newsList->deleteNews($id);
    } else http_response_code(404);
  }
}
