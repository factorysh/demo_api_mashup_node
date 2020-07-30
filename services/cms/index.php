<?php
require __DIR__ . '/vendor/autoload.php';

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Hmac\Sha256;

$key = new Key($_SERVER['SECRET']);

$signer = new Sha256();
$time = time();

$token = (new Builder())->issuedBy('cms') // Configures the issuer (iss claim)
                        ->permittedFor('http://' . $_SERVER['HTTP_HOST']) // Configures the audience (aud claim)
                        //->identifiedBy($id, true) // Configures the id (jti claim), replicating as a header item
                        ->issuedAt($time) // Configures the time that the token was issue (iat claim)
                        //->canOnlyBeUsedAfter($time) // Configures the time that the token can be used (nbf claim)
                        ->expiresAt($time + 3600) // Configures the expiration time of the token (exp claim)
                        ->withClaim('api', 'mashup') // Configures a new claim
                        ->getToken($signer, $key); // Retrieves the generated token


$txt = <<<EOT
Linus Torvalds : « Vos limitations matérielles ne devraient pas être un problème pour le reste d'entre nous »
EOT;
?>
<!DOCTYPE html>
<html>
<head>
<title>Demo API Mashup</title>
<script>
const TOKEN = '<?php echo $token; ?>';
const txt = <?php echo json_encode($txt); ?>;

fetch('/pict', {
    method: 'POST',
    body: JSON.stringify({
        txt: txt,
    }),
    headers: new Headers({
        authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
    })
}).then(response => response.json())
  .then(data => console.log(data));
</script>
</head>
<body>
<h1>Demo API Mashup</h1>

<div id="illustration">
</div>

</body>
</html>