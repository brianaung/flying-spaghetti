export const Photo101 = [
  {
    id: '11',
    name: 'Porsche',
    user: 'John Doe',
    photo:
      'https://i.pinimg.com/236x/cb/89/9e/cb899e0693d298bc3f6121c069cfc1a1.jpg',
    caption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aperiam, quibusdam accusantium perferendis obcaecati reprehenderit delectus in maiores necessitatibus facilis sequi enim optio quia et debitis fugit quis dolor ipsam unde nisi earum impedit reiciendis? Reiciendis libero rerum suscipit itaque obcaecati!'
  },
  {
    id: '12',
    name: 'RasPi',
    user: 'Jane Doe',
    photo: 'https://i.pinimg.com/236x/37/fc/c8/37fcc851d7112e04b873ad8f826fb6a3.jpg',
    caption:
      'Reiciendis libero rerum suscipit itaque obcaecati repudiandae, saepe eaque debitis nostrum voluptatem. Dolorem laborum tempore vel mollitia illum suscipit molestiae fugiat veritatis! Tempora illum error quia minima praesentium velit quidem hic. Deserunt illo at voluptates facere ipsum id blanditiis incidunt reprehenderit ad hic, sequi atque totam laudantium excepturi! Doloribus corrupti neque sapiente vitae sed ex, earum provident dignissimos cum minima tenetur vel maiores eveniet odio!'
  },
  {
    id: '13',
    name: 'sony',
    user: 'John Doe',
    photo: 'https://i.pinimg.com/236x/e4/6f/0f/e46f0fb6ba7bf26740f41af3bd716550.jpg',
    caption: 'found this in my local thrift store today what a classic'
  },
  {
    id: '17',
    name: 'Haikyuu',
    user: 'John Doe',
    photo: 'https://i.pinimg.com/236x/97/2f/b6/972fb63a745b4612b4214983e9abb196.jpg',
    caption: 'someone hmu to play volley'
  },
  {
    id: '14',
    name: 'Good day',
    user: 'John Doe',
    photo:
      'https://i.pinimg.com/236x/93/a7/fe/93a7feba74f4310e7a20cce84fd89719.jpg',
    caption: 'saw some nice rainbow today'
  },
  {
    id: '15',
    name: 'baNaNa',
    user: 'John Doe',
    photo:
      'https://i.pinimg.com/236x/fc/ff/e6/fcffe653d658c17af0f53248f883504e.jpg',
    caption: ''
  },
  {
    id: '16',
    name: 'New kicks',
    user: 'John Doe',
    photo:
      'https://i.pinimg.com/236x/72/27/4a/72274a00360daf41f358e11300f0c4ca.jpg',
    caption: ''
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
