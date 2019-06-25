# dispel-server

Synthesize speech with AWS Polly. Uses AWS S3 along with object expiration lifecycle rules for caching.

## Meta

* **State**: production
* **Production**:
  * **URL**: http://dispel.services.damonzucconi.com/
  * **URL**: https://damonzucconi-dispel-production.herokuapp.com/
* **Host**: https://dashboard.heroku.com/apps/damonzucconi-dispel-production
* **Deploys**: Merged PRs to `dzucconi/dispel-server#master` are automatically deployed to production. [Manually trigger a deploy](https://dashboard.heroku.com/apps/damonzucconi-dispel-production/deploy/github)
## API

* **URL**: `/`
* **Method**: `GET`

| Param   | Description     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input` | Text to speak   | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `voice` | Speaker's voice | `enum` - `[Nicole, Enrique, Tatyana, Russell, Lotte, Geraint, Carmen, Mads, Penelope, Mia, Joanna, Matthew, Brian, Seoyeon, Ruben, Ricardo, Maxim, Lea, Giorgio, Carla, Naja, Maja, Astrid, Ivy, Kimberly, Chantal, Amy, Vicki, Marlene, Ewa, Conchita, Karl, Zeina, Miguel, Mathieu, Justin, Lucia, Jacek, Bianca, Takumi, Ines, Gwyneth, Cristiano, Mizuki, Celine, Zhiyu, Jan, Liv, Joey, Raveena, Filiz, Dora, Salli, Aditi, Vitoria, Emma, Hans, Kendra]` |

See [Voices in Amazon Polly](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html) for language breakdown.
