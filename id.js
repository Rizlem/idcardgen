const badgeForm = document.getElementById('badgeForm');
const downloadBadge = document.getElementById('dwnBadge');
const createAnother = document.getElementById('createAnother');
const photoInput = document.getElementById('photo');
const badgePhoto = document.getElementById('badgePhoto');

badgeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formContainer = document.getElementById('formContainer');
    formContainer.style.display = 'none';

    const eventname = document.getElementById('eventname').textContent;
    const name = document.getElementById('name').value;
    const designation = document.getElementById('designation').value;
    const company = "@" + document.getElementById('company').value;
    const access = document.getElementById('access').value;

    // Update badge details
    $('#badgeEvent').text(eventname);
    $('#badgeName').text(name);
    $('#badgeDesignation').text(designation);
    $('#badgecontainer').text(company);
    $('#badgeAccess').text(access);

    // Handle photo upload
    const file = photoInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            badgePhoto.src = e.target.result;
            badgePhoto.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // Show the badge and buttons
    $('#badge').css('display', 'block');
    $('#dwnBadge').css('display', 'block');
    $('#createAnother').css('display', 'block');
});

createAnother.addEventListener('click', function () {
    $('#badge').css('display', 'none');
    $('#dwnBadge').css('display', 'none');
    $('#createAnother').css('display', 'none');

    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('badgeForm').reset();
    badgePhoto.style.display = 'none'; // Hide the photo
});

downloadBadge.addEventListener('click', function (e) {
    e.preventDefault();

    const badgeElement = document.getElementById('badge');
    htmlToImage.toPng(badgeElement)
        .then(function (dataUrl) {
            const link = document.createElement('a');
            link.download = document.getElementById('name').value + '.png';
            link.href = dataUrl;
            link.click();
        })
        .catch(function (error) {
            console.error('Error converting HTML to image:', error);
        });
});