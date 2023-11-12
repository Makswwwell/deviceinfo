function onDragStart(event) {
  event
    .dataTransfer
    .setData('text/plain', event.target.id);
  event
    .currentTarget
    .style
    event.backgroundColor = 'yellow';
    
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
    
    const dropzone = event.target;  

    const id = event
          .dataTransfer
          .getData('text');

    const draggableElement = document.getElementById(id); 
    
    dropzone.appendChild(draggableElement);
    event
      .dataTransfer
      .clearData();

}


const parent = document.querySelector('div.origin');

function convertToHex(bytes) {
    return (bytes).toString(16).toUpperCase()
}


function createPacketOnPanel(name, index) {
    var elementCreate = document.createElement("div")
    elementCreate.innerText = name 
    elementCreate.id='draggable-'+String(index+1)
    elementCreate.className = 'draggable'
    elementCreate.draggable = 'true';
    elementCreate.addEventListener('dragstart', function(event) {onDragStart(event)}, false) 
    elementCreate.addEventListener('dblclick', function(event) { 
        sh_element(index)
    }, false)

    parent.appendChild(elementCreate);
 
}

function sh_element(index) {
      var field = document.querySelector('div.dropzone');
      var create_field = document.querySelector('div.origin');
      var item = 'draggable-' + String(index+1)
      field.removeChild(document.getElementById(item))
      createPacketOnPanel(index)
}

function handleValue(element) {
    groupType = parseInt(element.value)
    for (var i=0; i < listIndexPerenos.length; i++) {
       var tag = document.getElementById('draggable-' + String(listIndexPerenos[i]))
       tag.style.backgroundColor = '#4AAE9B'
    }
    listIndexPerenos = []
}


class Info {

    constructor() {
      this.nameGroup = "empty";
      this.devices = [];
    }

}

var info = new Info()
let token = $('input[name="csrfmiddlewaretoken"]').prop('value');

function replace_info(items, name_items) {
    var result = ""
    var separator = ";"
    var j = 0
    for(j=0; j<items.length; j++) {
        result+= items[j].innerText + separator
    }
    info.nameGroup = name_items
    return result
}

function create_after_remove(items) {
    var j=0
    var num_elements = []
    for(j=0; j<items.length; j++) {
       var id_str = items[j].id.split('-')[1]
       var id_num = Number(id_str) - 1
       num_elements[j] = id_num
    }
    for(j=0; j<num_elements.length;j++) {
        sh_element(num_elements[j])
    }
}

function request_create_group() {
        var field = document.querySelector('div.dropzone');
        var items = field.getElementsByClassName('draggable')
        var name_items = $('#name_group').val()

        var str_devices = replace_info(items, name_items)
        create_after_remove(items)

        $.ajax({
          url: '',
          method: 'post',
          data: {
           'csrfmiddlewaretoken': token,
           'name': info.nameGroup,
           'dev': str_devices
          },
          success: function() {
              console.log("success")
          },
          error: function(){
            console.log("error");
          }
        });
}