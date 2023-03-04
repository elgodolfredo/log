// search actions
const form = document.getElementById('search-form');
const resultsContainer = document.getElementById('results');
const inputInterno = document.getElementById('interno');
// create actions
const buttonCreate = document.getElementById('button-create');
const containerCreate = document.getElementById('interno-container-create');
const textareaDescripCreate = document.getElementById('textarea-descrip-create');
const inputInternoCreate = document.getElementById('interno-create');
const formCreate = document.getElementById('form-create');
const cancelCreate = document.getElementById('cancel-create');
// edit actions
const buttonEdit = document.getElementById('button-edit');
const containerEdit = document.getElementById('interno-container-edit');
const textareaDescripEdit = document.getElementById('textarea-descrip-edit');
const inputInternoEdit = document.getElementById('interno-edit');
const formEdit = document.getElementById('form-edit');
const cancelEdit = document.getElementById('cancel-edit');
// save searched result
let interno = null;


async function searchInterno(numInterno) {
  return (await fetch(`/internos/${numInterno}`)).json(); 
}

async function insertInterno(numInterno, values){
  const body = JSON.stringify({ ...values, interno : numInterno })
  return ( await fetch('/internos', {
    body : body,
    method : 'POST',
    headers: {
      "Content-Type": "application/json",
    },
  })).json();
}

async function updateInterno(numInterno, values){
  const body = JSON.stringify(values);
  return ( await fetch(`/internos/${numInterno}`, {
    body : body,
    method : 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
  })).json();
}

function showInternoDescrip(descrip){
  if ( descrip ){
    resultsContainer.innerHTML = transformTextToHtml(descrip);
  } else {
    resultsContainer.innerHTML = '(Descripción vacía)';
  }
}

function hideEditForm(){
  containerEdit.style = 'display: none';
  textareaDescripEdit.innerHTML = '';
  inputInternoEdit.value = '';
}

function hideCreateForm(){
  containerCreate.style = 'display: none';
  textareaDescripCreate.innerHTML = '';
  inputInternoCreate.value = '';
}

function showSearchForm(){
  form.style = '';
  resultsContainer.style = '';
}

function hideSearchForm(){
  form.style = 'display:none';
  buttonCreate.style = 'display: none';
  buttonEdit.style = 'display: none';
  resultsContainer.style = 'display: none';
}

// events
form.onsubmit = ((e)=>{
  e.preventDefault();
  const value = inputInterno.value;

  searchInterno(value).then((result) => {
    interno = result;
    if ( interno ){
      showInternoDescrip(interno.descrip);
      inputInterno.value = '';
      buttonEdit.style = '';
      buttonCreate.style = 'display: none';
    } else {
      showInternoDescrip(`No se han encontrado resultados para ${value}`);
      buttonCreate.style = '';
      buttonEdit.style = 'display: none';
    }
  }).catch((error) =>{
    showInternoDescrip(error);
  })
});

buttonCreate.onclick = ((e) => {
  hideSearchForm();
  containerCreate.style = '';
  inputInternoCreate.value = inputInterno.value;
  textareaDescripCreate.innerHTML = '';
  textareaDescripCreate.innerText = '';
  textareaDescripCreate.value = '';
});


buttonEdit.onclick = ((e) => {
  hideSearchForm();
  containerEdit.style = '';
  inputInternoEdit.value = interno.interno;
  textareaDescripEdit.innerHTML = interno.descrip;
  textareaDescripEdit.innerText = interno.descrip;
  textareaDescripEdit.value = interno.descrip;
});


formCreate.onsubmit = ((e)=>{
  e.preventDefault();
  const numInterno = inputInternoCreate.value;
  const descrip = textareaDescripCreate.value;
  insertInterno(numInterno, { descrip : descrip }).then((result) => {
    hideCreateForm();
    showSearchForm();
    buttonCreate.style = 'display: none';
    resultsContainer.innerHTML = '';
  }).catch((error) =>{
    console.log(error);
  })
});

formEdit.onsubmit = ((e)=>{
  e.preventDefault();
  const numInterno = inputInternoEdit.value;
  const descrip = textareaDescripEdit.value;
  updateInterno(numInterno, { descrip : descrip }).then((result) => {
    interno = result;
    showInternoDescrip(interno.descrip);
    hideEditForm();
    showSearchForm();
    buttonEdit.style = '';
  }).catch((error) =>{
    console.log(error);
  })
});

cancelEdit.onclick = ((e) => {
  hideEditForm();
  showSearchForm();
  buttonEdit.style = '';
});

cancelCreate.onclick = ((e) => {
  hideCreateForm();
  showSearchForm();
  buttonCreate.style = '';
});