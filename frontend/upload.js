document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file to upload');
        return;
    }

    const apiKey = '0e46481e8432562aecfba9f8fc88205e'; // Replace with your ImgBB API key
    const formData = new FormData();
    formData.append('image', file);

    fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log(data)
            const imageUrl = data.data.url;
            document.getElementById('response').innerHTML = `Image uploaded successfully: <a href="${imageUrl}" target="_blank">${imageUrl}</a>`;
        } else {
            document.getElementById('response').textContent = 'Image upload failed';
        }
    })
    .catch(error => {
        console.error('Error uploading image:', error);
        document.getElementById('response').textContent = 'An error occurred while uploading the image';
    });
});
