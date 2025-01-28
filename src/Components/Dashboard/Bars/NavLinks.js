import { faDropbox } from "@fortawesome/free-brands-svg-icons";
import { faBook, faBox, faBoxArchive, faBoxes, faBoxOpen, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export const links = [
  {
    name: 'Users',
    path: 'users',
    faIcon: faUser,
    rules: '1995'
  }, {
    name: 'Add User',
    path: 'user/add',
    faIcon: faUserPlus,
    rules: '1995'
  },{
    name: 'Categories',
    path: 'categories',
    faIcon: faBoxes,
    rules: ['1995', '1999']
  },{
    name: 'Add Category',
    path: 'category/add',
    faIcon: faBox,
    rules: ['1995', '1999']
  },{
    name: 'Products',
    path: 'products',
    faIcon: faBoxArchive,
    rules: ['1995', '1999']
  },
  { 
  name: 'Add Product',
    path: 'product/add',
    faIcon: faBoxOpen,
    rules: ['1995', '1999']
  },
];