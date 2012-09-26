class _template

  path : 'js/app'
  templates : {}

  $.getJSON({
    url : 'js/app/json/templates.json',
    success : ( data ) ->
      this.templates = data
      continue
  })

  constructor : ( name ) ->
    return new EJS this.path + this.templates[ name ]