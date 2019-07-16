<?php 

require_once(MODEL_PATH . 'DefaultConfig.inc');

include_once(VIEW_PATH . "head.inc");

require_once(CONTROLLER_PATH . 'login.php');

?>
    <title><?php echo DefaultConfing::includeTitle('Configurar') ?></title>
    <script src="/src/scripts/general-navs.jsx" type="text/babel"></script>
    <script>
        var REGISTRO_REF = React.createRef();
    </script>
<?php
if ( getIdUser() == 1 ):
?>
    <script src="/src/scripts/setting-navs.jsx" type="text/babel"></script>
<?php
endif;
?>
    <script src="/src/scripts/navbar.jsx" type="text/babel"></script>

</head>
<body>
    <header></header>
	<section>
        <div id="registro-cnt" class="col-sm-9 col-xs-12"></div>
    </section>
</body>
</html>