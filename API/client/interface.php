
<?php

  $socket = fsockopen("52.2.107.105","5038", $errno, $errstr, 10);
        fputs($socket, "Action: Login\r\n");
        fputs($socket, "UserName: admin\r\n");
        fputs($socket, "Secret: amp111\r\n\r\n");

        fputs($socket, "Action: Command\r\n");
        fputs($socket, "Command: core show channels\r\n\r\n");

        //$start = time();

        // while(!feof($socket)) {
        //   if(time() - $start > 15) {
        //     break;
        //   }

        //   $res = trim(fgets($socket));

        //   if(strpos($res, "SIP/7008") !== 0) {
        //     continue;
        //   }

        //   $channel = trim(substr($res, 0, strpos($res, " ")));
        //   fputs($socket, "Action: Command\r\n");
        //   fputs($socket, "Command: channel request hangup $channel\r\n\r\n");
        //   fflush($socket);
        //   break;
        // }

        sleep(2);
        fclose($socket);

?>
