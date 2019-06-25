# dispel-server

Synthesize speech with AWS Polly. Uses AWS S3 along with object expiration lifecycle rules for caching.

## Meta

* **State**: production
* **Production**:
  * **URL**: http://dispel.services.damonzucconi.com/
  * **URL**: https://damonzucconi-dispel-production.herokuapp.com/

## API

* **URL**: `/`
* **Method**: `GET`

| Param   | Description     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input` | Text to speak   | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `voice` | Speaker's voice | `enum` - `[Nicole, Enrique, Tatyana, Russell, Lotte, Geraint, Carmen, Mads, Penelope, Mia, Joanna, Matthew, Brian, Seoyeon, Ruben, Ricardo, Maxim, Lea, Giorgio, Carla, Naja, Maja, Astrid, Ivy, Kimberly, Chantal, Amy, Vicki, Marlene, Ewa, Conchita, Karl, Zeina, Miguel, Mathieu, Justin, Lucia, Jacek, Bianca, Takumi, Ines, Gwyneth, Cristiano, Mizuki, Celine, Zhiyu, Jan, Liv, Joey, Raveena, Filiz, Dora, Salli, Aditi, Vitoria, Emma, Hans, Kendra]` |
