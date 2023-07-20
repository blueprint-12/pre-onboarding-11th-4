# backend Mock api 설명

> 🟡**WARN**: root(front) 폴더는 패키지 매니저로 `yarn`을 사용하고 있습니다. back 폴더는 `npm`을 기준으로 설명이 되어 있습니다.

## Getting started

0. move to the /back directory `cd /back`

1. Install dependencies
   `npm install`

2. start server
   `npm start`

Now server is running on http://localhost:4000/sick

## Example

`GET /sick?q=담낭`

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Connection: keep-alive
Content-Length: 401
Content-Type: application/json; charset=utf-8
ETag: W/"191-7DnIoxk/oktj4DgKFpQhLQmCm7M"
Expires: -1
Keep-Alive: timeout=5
Pragma: no-cache
Vary: Origin, Accept-Encoding
X-Content-Type-Options: nosniff
X-Powered-By: Express
```

```json
[
  {
    "sickCd": "C23",
    "sickNm": "담낭의 악성 신생물"
  },
  {
    "sickCd": "K81",
    "sickNm": "담낭염"
  },
  {
    "sickCd": "K82",
    "sickNm": "담낭의 기타 질환"
  },
  {
    "sickCd": "K87",
    "sickNm": "달리 분류된 질환에서의 담낭, 담도 및 췌장의 장애"
  },
  {
    "sickCd": "Q44",
    "sickNm": "담낭, 담관 및 간의 선천기형"
  }
]
```
