<?php

require_once(MODEL_PATH . 'Conexion.inc');
require_once(MODEL_PATH . 'DefaultConfig.inc');

class SignIn
{
    private $correo;
    private $password;
    private $session;
    private $ip;
    private $id_user;
    private $respuesta;

    /**
     * @param string $correo Correo del usuario
     * @param string $password Contraseña
     * @param string $session Hash generado para la sesión
     * @param string $ip Ip de la del dispositivo de donde se está conectando
     */
    public function __construct(string $correo, string $password, string $session, string $ip) {
        # $this->correo = mysqli::escape_string($correo) ;
        $this->correo = $correo;
        $this->password = $password;
        $this->session = $this->hashVal($session);
        $this->ip = $ip;
        $this->id_user = null;
	    /* $this->userLogged();

        if ($this->isLogged() == null && filter_var($this->correo, FILTER_VALIDATE_EMAIL)) {
            $this->login();
        } */
    }

    /**
     * @param string $valor Dato para pasar por el hash
     * @return string Hash de sha256 de $valor
     */
    private function hashVal(string $valor)
    {
        return hash("sha256", $valor);
    }

    public function userLogged()
    {
        $user = null;
        $db = new Conexion();
        $sql = "SELECT S.idUsuario, U.correo, S.idSesion FROM Usuario U, Sesion S WHERE S.session='%s' AND S.ip='%s' AND S.idUsuario = U.idUsuario;";
        $result = $db->query( sprintf( $sql, $db->escape_string($this->session), $db->escape_string($this->ip) ) );
        if ($result && $result->num_rows > 0) {
            $row=$result->fetch_row();
            if ( $this->correoHashedMethod($row[0], $row[1]) == $this->correo ) {
                $user = $row[0];
                $sql = "UPDATE Sesion SET lastConexion='%s' WHERE idSesion=%d;";
                $fecha = date('Y-m-d H:i:s');
                $db->query( sprintf( $sql, $db->escape_string($fecha), $row[2] ) );
            }
            $result->free();
        }
        $this->id_user = $user;
        $db->close();
    }

    public function login() {
        $db = new Conexion();
        $this->respuesta = [false, 'Login init'];
        if ($this->correo === DefaultConfing::getCorreoRoot() && $this->password === DefaultConfing::getPasswordRoot()) {
            $this->respuesta = [false, 'Login usuario raiz init'];
            $sql = "SELECT * FROM Usuario WHERE idUsuario=1;";
            $result = $db->query( $sql );
            $insert = false;
            if ($result && $result->num_rows == 1) {
                $sql = "UPDATE Usuario SET correo='%s', password='%s' WHERE idUsuario=1;";
            } else {
                $sql = "INSERT INTO Usuario VALUES (1, '%s', '%s');";
                $insert = true;
            }
            $db->query( sprintf( $sql, $db->escape_string($this->correo), $db->escape_string($this->hashVal($this->password)) ) );
			if ($insert) {
				$sql = "INSERT INTO UsuarioAsesores VALUES (1, 1);";
				$db->query($sql);
			}
        }
        $this->respuesta = [false, 'Login usuario normal init'];
        $sql = "SELECT idUsuario FROM Usuario WHERE correo='%s' AND password='%s';";
        $result = $db->query( sprintf( $sql, $db->escape_string($this->correo), $db->escape_string($this->hashVal($this->password)) ) );
        if ($result && $result->num_rows == 1) {
            
            $this->respuesta = [true, 'Login existe usuario init:  '];
            $row = $result->fetch_row();
            # $sql = "INSERT INTO Sesion (idUsuario, session, ip) VALUES ({$row[0]}, {$this->hashVal($this->session)}, {$this->ip});";
            $sql = "INSERT INTO Sesion (idUsuario, session, ip) VALUES (%d, '%s', '%s');";
            $this->respuesta[1] .= sprintf( $sql, $row[0], $db->escape_string($this->hashVal($this->session)), $db->escape_string($this->ip) );
            if ( $db->query( sprintf( $sql, $row[0], $db->escape_string($this->hashVal($this->session)), $db->escape_string($this->ip) ) ) ) {
                $this->id_user = $row[0];
                $this->respuesta = [true, 'Login sesion creada'];
            }
            $result->free();
        }
        $db->close();
        return $this->respuesta;
    }

    /**
     * @return bool Determinar si hay un usuario logeado
     */
    public function isLogged() {
        return $this->id_user != null;
    }


    public function getIdUser()
    {
        return $this->id_user;
    }

    private function correoHashedMethod($val1, $val2) {
        return $this->hashVal($val1 . $val2);
    }

    public function getCorreoHashed()
    {
        return $this->correoHashedMethod($this->id_user, $this->correo);
    }

    public function getSession() {
        return $this->session;
    }

	public static function confirmUser($id_user) {
		$return = false;
		$db = new Conexion();
		$sql = "SELECT idUsuario FROM Usuario WHERE idUsuario=%d";
		$result = $db->query( sprintf($sql, $id_user) );
		if ($result && $result->num_rows==1) {
			$return = true;
			$result->free();
		}
		$db->close();
		return $return;
	}
}


?>
