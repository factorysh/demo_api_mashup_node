<?php
require __DIR__ . '/vendor/autoload.php';

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Ramsey\Uuid\Uuid;

$key = new Key($_ENV['SECRET']);

$signer = new Sha256();
$time = time();
$id = Uuid::uuid4();

$token = (new Builder())->issuedBy('cms') // Configures the issuer (iss claim)
                        ->permittedFor('http://' . $_SERVER['HTTP_HOST']) // Configures the audience (aud claim)
                        ->identifiedBy($id, true) // Configures the id (jti claim), replicating as a header item
                        ->issuedAt($time) // Configures the time that the token was issue (iat claim)
                        ->canOnlyBeUsedAfter($time) // Configures the time that the token can be used (nbf claim)
                        ->expiresAt($time + 3600) // Configures the expiration time of the token (exp claim)
                        ->withClaim('uid', 1) // Configures a new claim, called "uid"
                        ->getToken($signer, $key); // Retrieves the generated token

?>
<!DOCTYPE html>
<html>
<head>
<title>Demo API Mashup</title>
</head>
<body>
<h1>Demo API Mashup</h1>

<?php
echo $token;
?>

</body>
</html>