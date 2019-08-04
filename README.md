# dispel-server

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdzucconi%2Fdispel-server.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdzucconi%2Fdispel-server?ref=badge_shield)

Synthesize speech with AWS Polly. Uses AWS S3 along with object expiration lifecycle rules for caching.

## Meta

- **State**: production
- **Production**:
  - **URL**: http://dispel.services.damonzucconi.com/
  - **URL**: https://damonzucconi-dispel-production.herokuapp.com/
- **Host**: https://dashboard.heroku.com/apps/damonzucconi-dispel-production
- **Deploys**: Merged PRs to `dzucconi/dispel-server#master` are automatically deployed to production. [Manually trigger a deploy](https://dashboard.heroku.com/apps/damonzucconi-dispel-production/deploy/github)

## Parameters

- **URL**: `/`
- **Method**: `GET`

| Param      | Description                            | Type                   | Default         |
| ---------- | -------------------------------------- | ---------------------- | --------------- |
| `input`    | Text to speak                          | `string`               | `"Hello world"` |
| `redirect` | Redirect to mp3                        | `boolean`              | `false`         |
| `voice`    | Speaker's voice                        | `enum` (see below)     | `"Matthew"`     |
| `mode`     | Mode (if `ssml` input must be encoded) | `"text"\|"ssml"`       | `"text"`        |
| `engine`   | Speech engine                          | `"standard"\|"neural"` | `"standard"`    |

### Voices

| Language                      | Female Names/ID                       | Male Names/ID         |
| ----------------------------- | ------------------------------------- | --------------------- |
| Arabic (arb)                  | Zeina                                 |                       |
| Chinese, Mandarin (cmn-CN)    | Zhiyu                                 |                       |
| Danish (da-DK)                | Naja                                  | Mads                  |
| Dutch (nl-NL)                 | Lotte                                 | Ruben                 |
| English, Australian (en-AU)   | Nicole                                | Russell               |
| English, British (en-GB)      | Amy, Emma                             | Brian                 |
| English, Indian (en-IN)       | Aditi (bilingual with Hindi), Raveena |                       |
| English, US (en-US)           | Ivy, Joanna, Kendra, Kimberly, Salli  | Joey, Justin, Matthew |
| English, Welsh (en-GB-WLS)    |                                       | Geraint               |
| French (fr-FR)                | Céline/Celine, Léa                    | Mathieu               |
| French, Canadian (fr-CA)      | Chantal                               |                       |
| German (de-DE)                | Marlene, Vicki                        | Hans                  |
| Hindi (hi-IN)                 | Aditi (bilingual with Indian English) |                       |
| Icelandic (is-IS)             | Dóra/Dora                             | Karl                  |
| Italian (it-IT)               | Carla, Bianca                         | Giorgio               |
| Japanese (ja-JP)              | Mizuki                                | Takumi                |
| Korean (ko-KR)                | Seoyeon                               |                       |
| Norwegian (nb-NO)             | Liv                                   |                       |
| Polish (pl-PL)                | Ewa, Maja                             | Jacek, Jan            |
| Portuguese, Brazilian (pt-BR) | Vitória/Vitoria                       | Ricardo               |
| Portuguese, European (pt-PT)  | Inês/Ines                             | Cristiano             |
| Romanian (ro-RO)              | Carmen                                |                       |
| Russian (ru-RU)               | Tatyana                               | Maxim                 |
| Spanish, European (es-ES)     | Conchita, Lucia                       | Enrique               |
| Spanish, Mexican (es-MX)      | Mia                                   |                       |
| Spanish, US (es-US)           | Penélope/Penelope                     | Miguel                |
| Swedish (sv-SE)               | Astrid                                |                       |
| Turkish (tr-TR)               | Filiz                                 |                       |
| Welsh (cy-GB)                 | Gwyneth                               |                       |

## See [Voices in Amazon Polly](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html) for more information.

---

- **URL**: `/status`
- **Method**: `GET`

Returns 200 OK if system is up.

---

- **URL**: `/voices`
- **Method**: `GET`

Returns an array of available voices:

```json
[
  {
    "Gender": "Female",
    "Id": "Lotte",
    "LanguageCode": "nl-NL",
    "LanguageName": "Dutch",
    "Name": "Lotte",
    "SupportedEngines": ["standard"]
  }
  // ...
]
```
