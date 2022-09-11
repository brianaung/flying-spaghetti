const Photo101 = 
[
    {
        id: '11',
        name: 'my dog',
        photo: '../samplePhotos/Cute_dog.jpg'
    },
    {
        id: '12',
        name: 'my house',
        photo: '../samplePhotos/my_house.jpg'
    },
]

const Photo102 = 
[
    {
        id: '21',
        name: 'my friends',
        photo: '../samplePhotos/my_friends.jpg'
    },
    {
        id: '22',
        name: 'fav color',
        photo: '../samplePhotos/fav_color.jpg'
    },
]
const Photofolders = 
[
    {
        id: '101',
        name: 'private photos',
        photos: Photo101
    },
    {
        id: '102',
        name: 'public photos',
        photos: Photo102
    }
]

const Photofolders1 = 
[
    {
        id: '201',
        name: 'private photos',
        photos: Photo101
    },
    {
        id: '202',
        name: 'public photos',
        photos: Photo102
    }
]
const Users = 
[
    {
        id: '10001',
        first_name: 'Bartholomeau',
        last_name: 'Hogan',
        folders: Photofolders,
        photos: []

    },
    {
        id: '10002',
        first_name: 'Cardigan',
        last_name: 'Hogan',
        folders: Photofolders1

    },
]





module.exports = Users