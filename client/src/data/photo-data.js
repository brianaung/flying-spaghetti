export const Photo101 = [
  {
    id: '11',
    name: 'my dog',
    photo:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*'
  },
  {
    id: '12',
    name: 'my house',
    photo: 'https://carlislehomes.com.au/static/images/hal/CARL607554_Matisse33_003_2.jpg'
  },
  {
    id: '13',
    name: 'my cat',
    photo: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'
  },
  {
    id: '14',
    name: 'my toy',
    photo:
      'https://cdn.shopify.com/s/files/1/0358/0310/3363/files/mobilo-toys-childplay-melbourne_x800.png?v=1654482053'
  }
];

export const Photo102 = [
  {
    id: '21',
    name: 'my friends',
    photo: '../samplePhotos/my_friends.jpg'
  },
  {
    id: '22',
    name: 'fav color',
    photo: '../samplePhotos/fav_color.jpg'
  }
];
export const Photofolders = [
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
];

export const Photofolders1 = [
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
];

export const Users = [
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
  }
];

export default Users;
