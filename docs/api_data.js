define({ "api": [
  {
    "type": "post",
    "url": "<BASE_URL>/api/words/counter",
    "title": "",
    "name": "WordsCounter",
    "group": "Words",
    "description": "<p>Counts number of appearences for each word in the input</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>&quot;string&quot;, &quot;file&quot; or &quot;url&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>depending on the &quot;type&quot; param the relevant value (note: for &quot;file&quot; need full path)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>&quot;ok&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/api/words.js",
    "groupTitle": "Words",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api<BASE_URL>/api/words/counter"
      }
    ]
  },
  {
    "type": "get",
    "url": "<BASE_URL>/api/words/stats/:word",
    "title": "",
    "name": "WordsStats",
    "group": "Words",
    "description": "<p>Get number of times a word appeared so far (in all previous inputs)</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "word",
            "description": "<p>the input word checked</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>the number of times the input word appeared so far</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/api/words.js",
    "groupTitle": "Words",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api<BASE_URL>/api/words/stats/:word"
      }
    ]
  }
] });
