<?php
sleep(1);

$res = array(
    'Request Method' => $_SERVER['REQUEST_METHOD'],
    'args' => array()
);

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $res['args'] = $_GET;
}

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $res['args'] = $_POST;
}

if(count($_FILES) > 0) {
    $res['files'] = $_FILES;

    foreach($res['files'] as $k => $v) {
        $res['files'][$k]['tmp_name'] = '...';
    }
}

if(isset($_GET['use_post_message']) || isset($_POST['use_post_message'])) {
    echo '
        <script>
            if(window.location.search.indexOf( "need_incorrect_data=1" ) > -1) {
                parent.postMessage( ' . json_encode($res) . ', "*" );
            }
            else {
                parent.postMessage( JSON.stringify( ' . json_encode($res) . ' ), "*" );
            }
        </script>
    ';
}
else {
    echo json_encode($res, JSON_PRETTY_PRINT);
}