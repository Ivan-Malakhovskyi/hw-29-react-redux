1. Показати на дошці Excalidraw про те, що різним користувачам, потірбні різні дані з бд. Для цього дати аналогію з пропускоим на роботу, тобто унікальний id(номер). Було б не вірно, щоб користувач сам створював собі id і відправляв на сервер - незпечно, бо фронтенд не захищений. Джерелом правди завжди має бути бекенд. Тому потрібен механізм, який посилає дані на сервер в захищеному вигляді - один з них JWT. JWT - генерує бекенд

2. https://www.jwt.io/

3. https://randomkeygen.com/

FLOW

Register => backend checks validity => create jwt and add userinfo and response it jwt on frontend
=> get it key and add to every next request in headers => backend get token and decode this token (decode can only backend, because backend know secret_key, that used while creating jwt), because if has secret can decode jwt with decode algorithm
=> if token valid backend response data it is user - backend stateless - only req - res
