// JWT 三段 base64
// header.payload.signature


function signature(header, payload, secret) {
  let header = {alg: 'HS256', typ: 'JWT'}
  const tokenArr = [
    base64(header),
    base64(payload),
    base64(header + '.' + payload + '.' + secret)
  ].join(',')
}

function base64UrlEncode(str) {
  return Buffer.from(str).toString('base64')
}