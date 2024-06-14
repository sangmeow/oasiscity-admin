import jwt from 'jsonwebtoken';

const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAiIqvlukZOu7gYApNEfF5zUT7Gxpyh4CdVyLMWNT5PdbdHCQd
jteYXyY+KI/jROP6ENdXsTRJ8MXn1Xavnt8NGf8DCAv3w2yGfbZDNW0ItECvC/pQ
pkJJD11qkP87khuUGEI1Ew1pBbQEewQg6ere8i+MbS7+inl9oVZxM0e/wzo895U6
cYa9zv7QZ8R74mSJ3lowQuUyP1XuMDv6XqZFAObzzxrcgyxa/hwowVSiyUzt4r20
CCLe+7c2k/bdvy6KtqQ5ryYFbttj6azu7xi+84IuQsSlYLF/c4eTL2v1/ouG2tXh
fDbC/X5gthYf+2ajLPQbwv6fI7jeEOzMq+cjOQIDAQABAoIBAC1WZ4FjeuYvpT8e
jIK1vKzlB7/zIy5NDXF+c33Xkb7v1lFeyJXCjqyhZShQxrT8Qe9PoaWMaDTTcexW
UXAePhpwq5ADcUxpf6rEV0KpJqe7hqQihJ8ACYRZj2X/6cbU83KuoTLnVAT5xjcW
otspCsg985HZddmDB60Hp+TQISNweZRBRS9JlDWz92TLbb7pk/+6Y8uW41KcD6lr
yPn+D9LkbmHjueKC9pIUAN9PQ1dQ6ZLV4/fGGKDhbSBwB2urQ2w5e/uoEz7mlHru
aQ5Nd3XPcZin2VzhOsPOzDYHszX2FPSLgt/JwJgk3XLyqtZUruGn0WP/VDk3qWS+
3QjL3+UCgYEAyDtoSFEEuF78DrlYQtX3BC71WdPGEChFpTwwYH1X2vxV8qi60p/l
he45hege+hKEgkqWruZYI3dQr9Sf+HPpxmIMmIJp7750SeETX5yrwxkfwx0EsL2v
/eTsvb2x5/0TYiDzECTbck/p2I244BS6C50Abn9pSrQu6QVbYIeQTpsCgYEArpIk
29DI8QkAbRaJpoKVUkitKFYgYZZS5vnE6tT6HUHXzEosFzm+vlJJibFo62v4uaoQ
VEwJSiJqhq2t+cdraT8crgsHmZzaTb4rVGwTxGS+ceAZyVwMmpc7rFefhhAiwpgF
886FM+16TXTpjTQThqc5lDVgITJCvdTHgUA4qLsCgYBEf65JLw5CVJw+HUIIe1Ip
6DafKEeVt3E7+b9DAx5PGAv/G6Ht9C19B+Y93Q7b1gHm4MVzx/FXELZVsJOZV24e
I+TTN6ouDiWSMKGEEADimXG4OfEk1X+jh/FFZ+O4zWcYJtWALFu2W4hQQQuB/RU4
a9l987B9ke6KYP7FoxrHCQKBgD9S+hXWtZ1hs4reuw3wnnPbsxxHqbVcjzQD9F9u
5E+Km9oaKcY/BycIuG4/MZz8bJwEyamab2A5/cRe6hYKNbdW0nN7wsUBNdsvmY4l
KkJ6fO7X6OK3Bkdphpbsrgw2fDV0aexXxM/iXBQOzc2Pz2lv7Z4KgpVoIvezYK9M
+YCTAoGAb90oDkmaDFNt9O74BGEjj3TSrLtuPRadlz+JtYbOn2hBfHFpG1yMkwr7
lHBQlnc3gT6T0LnlmzCbA2/NAHHvXYbdhQWUFAfyPbQXP0MYhhXRw8s4mgS7lhV9
UeAakSbguHWPK7daNJlu1j0iWOmxwOYWP2w5/5IudkKUlMFL+fo=
-----END RSA PRIVATE KEY-----
`;

const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiIqvlukZOu7gYApNEfF5
zUT7Gxpyh4CdVyLMWNT5PdbdHCQdjteYXyY+KI/jROP6ENdXsTRJ8MXn1Xavnt8N
Gf8DCAv3w2yGfbZDNW0ItECvC/pQpkJJD11qkP87khuUGEI1Ew1pBbQEewQg6ere
8i+MbS7+inl9oVZxM0e/wzo895U6cYa9zv7QZ8R74mSJ3lowQuUyP1XuMDv6XqZF
AObzzxrcgyxa/hwowVSiyUzt4r20CCLe+7c2k/bdvy6KtqQ5ryYFbttj6azu7xi+
84IuQsSlYLF/c4eTL2v1/ouG2tXhfDbC/X5gthYf+2ajLPQbwv6fI7jeEOzMq+cj
OQIDAQAB
-----END PUBLIC KEY-----
`;

// signin jwt
export function signJWT(payload: object, expiresIn: string | number) {
	return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn });
}

// verify jwt
export function verifyJWT(token: string) {
	try {
		const decoded = jwt.verify(token, publicKey);
		return { payload: decoded, expired: false };
	} catch (error: any) {
		return { payload: null, expired: error.message.include('jwt expired') };
	}
}
