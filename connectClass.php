<?php

class Dbh {
  private $servername;
  private $username;
  private $password;
  private $dbname;

  protected function connects(){
    $this -> servername = "127.0.0.1:3306";
    $this -> username = "mysql";
    $this -> password = "mysql";
    $this -> dbname = "newsdb";

    $connect = new mysqli($this -> servername,$this -> username,$this -> password,$this -> dbname);
    return $connect;
  }
}