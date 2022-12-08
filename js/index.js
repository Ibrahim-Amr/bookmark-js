let siteName = document.querySelector('#siteName');
let siteUrl = document.querySelector('#siteUrl');
let submetBTN = document.querySelector('button');
let dltBTN;
let bookMarkList = [];

////// Checking the local Storage if empty or there is old date
if (localStorage.getItem('bookMarks') != null) {
  bookMarkList = JSON.parse(localStorage.getItem('bookMarks'));
  displayBookMark();
} else {
  console.log('no old Data');
}

////// Adding bookmark Function
function addBookMark() {
  if ((siteNameRegex() == true) & (siteUrlRegex() == true)) {
    let bookMark = {
      name: siteName.value,
      url: siteUrl.value,
    };
    bookMarkList.push(bookMark);
    displayBookMark();
    localStorage.setItem('bookMarks', JSON.stringify(bookMarkList));
  }
}

submetBTN.addEventListener('click', function () {
  addBookMark();
});

////// Button Var is the array of delete Buttons
var button;

////// Function Of displaying bookmarks
function displayBookMark() {
  let cartona = '';
  for (let i = 0; i < bookMarkList.length; i++) {
    cartona += `<tr>
                  <td class="bm-name">${bookMarkList[i].name}</td>
                  <td>
                  <a href="${bookMarkList[i].url}" class="btn btn-outline-warning" target="_blank">VISIT</a>
                  </td>
                  <td>
                    <button class="btn btn-outline-danger" id="dltBTN">Delete</button>
                  </td>
                </tr>`;
    document.querySelector('#tableDate').innerHTML = cartona;
    clearForm();
    dltBTN = document.querySelectorAll('#dltBTN');
    button = Array.from(dltBTN);
    addDeleteEvent();
  }
}

////// Function of Adding Events to DELETE butoon
function addDeleteEvent() {
  for (var i = 0; i < dltBTN.length; i++) {
    dltBTN[i].addEventListener('click', function () {
      deleteBookMark(button.indexOf(this));
    });
  }
}

////// CLEARING THE FORM FUNCTION
function clearForm() {
  siteName.value = '';
  siteUrl.value = '';
}

// Function Of deleteing bookmarks
function deleteBookMark(dlt) {
  bookMarkList.splice(dlt, 1);
  displayBookMark();
  localStorage.setItem('bookMarks', JSON.stringify(bookMarkList));
}

///// REGEX OF THE SITE NAME
function siteNameRegex() {
  let regex = /^[a-zA-Z]{4,20}[0-9]{0,20}$/;
  if (regex.test(siteName.value) == true) {
    document.getElementById('invalidName').classList.add('d-none');
    return true;
  } else {
    document.getElementById('invalidName').classList.remove('d-none');
    return false;
  }
}

siteName.addEventListener('input', function () {
  siteNameRegex();
});

////// REGEX OF THE SITE URL
function siteUrlRegex() {
  let regex = /^(https)/;
  if (regex.test(siteUrl.value) == true) {
    document.getElementById('invalidUrl').classList.add('d-none');
    return true;
  } else {
    document.getElementById('invalidUrl').classList.remove('d-none');
    return false;
  }
}

siteUrl.addEventListener('input', function () {
  siteUrlRegex();
});
