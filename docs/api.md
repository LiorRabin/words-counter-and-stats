<a name="top"></a>
# Words Counter &amp; Stats API v1.0.0

Words counter and statistics API

- [Words](#Words)
	- [Counts number of appearences for each word in the input](#Counts-number-of-appearences-for-each-word-in-the-input)
	- [Get number of times a word appeared so far (in all previous inputs)](#Get-number-of-times-a-word-appeared-so-far-(in-all-previous-inputs))
	


# <a name='Words'></a> Words

## <a name='Counts-number-of-appearences-for-each-word-in-the-input'></a> Counts number of appearences for each word in the input
[Back to top](#top)

<p>Counts number of appearences for each word in the input</p>

```
POST /api/words/counter
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| type | `String` | <p>&quot;string&quot;, &quot;file&quot; or &quot;url&quot;</p> |
| value | `String` | <p>depending on the &quot;type&quot; param the relevant value (note: for &quot;file&quot; need full path)</p> |

### Success response

#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| response | `String` | <p>&quot;ok&quot;</p> |

## <a name='Get-number-of-times-a-word-appeared-so-far-(in-all-previous-inputs)'></a> Get number of times a word appeared so far (in all previous inputs)
[Back to top](#top)

<p>Get number of times a word appeared so far (in all previous inputs)</p>

```
GET /api/words/stats/:word
```

### Success response

#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| word | `String` | <p>the input word checked</p> |
| count | `Number` | <p>the number of times the input word appeared so far</p> |
