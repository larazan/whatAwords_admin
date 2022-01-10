import Home from '../pages/Home';
import Product from '../pages/Product';
import Table from '../pages/Table';

import Authors from '../pages/Authors';
import AuthorDetail from '../pages/AuthorDetail';
import AuthorAdd from '../pages/AuthorAdd';
import AuthorEdit from '../pages/AuthorEdit';

import Categories from '../pages/Categories';
import CategoryAdd from '../pages/CategoryAdd';
import CategoryEdit from '../pages/CategoryEdit';

import Quotes from '../pages/Quotes';
import QuoteDetail from '../pages/QuoteDetail';
import QuoteAdd from '../pages/QuoteAdd';
import QuoteEdit from '../pages/QuoteEdit';

import Tags from '../pages/Tags';
import TagAdd from '../pages/TagAdd';
import TagEdit from '../pages/TagEdit';
import TagDetail from '../pages/TagDetail';

import Users from '../pages/Users';
import UserDetail from '../pages/UserDetail';
import UserAdd from '../pages/UserAdd';
import UserEdit from '../pages/UserEdit';

import Forms from '../pages/Forms';
import Select from '../pages/Select';
import Modal from '../pages/Modals';
import Gradients from '../pages/Gradients';

import Articles from '../pages/Articles';
import ArticleAdd from '../pages/ArticleAdd';
import ArticleDetail from '../pages/ArticleDetail';
import ArticleEdit from '../pages/ArticleEdit';

import Faqs from '../pages/Faqs';
import FaqAdd from '../pages/FaqAdd';
import FaqDetail from '../pages/FaqDetail';
import FaqEdit from '../pages/FaqEdit';


var route = [
    {
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: Home,
        layout: "/admin",
    },
    {
        path: "/product",
        name: "Product",
        icon: "ni ni-tv-2 text-primary",
        component: Product,
        layout: "/admin",
    },
    {
        path: "/table",
        name: "Table",
        icon: "ni ni-tv-2 text-primary",
        component: Table,
        layout: "/admin",
    },
    {
        path: "/authors/:id?",
        name: "Authors",
        icon: "ni ni-tv-2 text-primary",
        component: Authors,
        layout: "/admin",
    },
    {
        path: "/author/:id?",
        name: "Author Detail",
        icon: "ni ni-tv-2 text-primary",
        component: AuthorDetail,
        layout: "/admin",
    },
    {
        path: "/add-author",
        name: "Add Author",
        icon: "ni ni-tv-2 text-primary",
        component: AuthorAdd,
        layout: "/admin",
    },
    {
        path: "/edit-author/:id?",
        name: "Edit Author",
        icon: "ni ni-tv-2 text-primary",
        component: AuthorEdit,
        layout: "/admin",
    },
    {
        path: "/categories",
        name: "Categories",
        icon: "ni ni-tv-2 text-primary",
        component: Categories,
        layout: "/admin",
    },
    {
        path: "/add-category",
        name: "Add Category",
        icon: "ni ni-tv-2 text-primary",
        component: CategoryAdd,
        layout: "/admin",
    },
    {
        path: "/edit-category/:id?",
        name: "Edit Category",
        icon: "ni ni-tv-2 text-primary",
        component: CategoryEdit,
        layout: "/admin",
    },
    {
        path: "/quotes/:pageNumber?",
        name: "Quotes",
        icon: "ni ni-tv-2 text-primary",
        component: Quotes,
        layout: "/admin",
    },
    {
        path: "/quote/:id?",
        name: "Quote Detail",
        icon: "ni ni-tv-2 text-primary",
        component: QuoteDetail,
        layout: "/admin",
    },
    {
        path: "/add-quote",
        name: "Add Quote",
        icon: "ni ni-tv-2 text-primary",
        component: QuoteAdd,
        layout: "/admin",
    },
    {
        path: "/edit-quote/:id?",
        name: "Edit Quote",
        icon: "ni ni-tv-2 text-primary",
        component: QuoteEdit,
        layout: "/admin",
    },
    {
        path: "/tags",
        name: "Tags",
        icon: "ni ni-tv-2 text-primary",
        component: Tags,
        layout: "/admin",
    },
    {
        path: "/add-tag",
        name: "Add Tag",
        icon: "ni ni-tv-2 text-primary",
        component: TagAdd,
        layout: "/admin",
    },
    {
        path: "/edit-tag/:id",
        name: "Edit Tag",
        icon: "ni ni-tv-2 text-primary",
        component: TagEdit,
        layout: "/admin",
    },
    {
        path: "/tag/:id?",
        name: "Tag Detail",
        icon: "ni ni-tv-2 text-primary",
        component: TagDetail,
        layout: "/admin",
    },
    {
        path: "/users",
        name: "Users",
        icon: "ni ni-tv-2 text-primary",
        component: Users,
        layout: "/admin",
    },
    {
        path: "/user/:id?",
        name: "User Detail",
        icon: "ni ni-tv-2 text-primary",
        component: UserDetail,
        layout: "/admin",
    },
    {
        path: "/add-user",
        name: "Add User",
        icon: "ni ni-tv-2 text-primary",
        component: UserAdd,
        layout: "/admin",
    },
    {
        path: "/edit-user/:id?",
        name: "Edit User",
        icon: "ni ni-tv-2 text-primary",
        component: UserEdit,
        layout: "/admin",
    },
    {
        path: "/faqs",
        name: "Faqs",
        icon: "ni ni-tv-2 text-primary",
        component: Faqs,
        layout: "/admin",
    },
    {
        path: "/add-faq",
        name: "Add Faq",
        icon: "ni ni-tv-2 text-primary",
        component: FaqAdd,
        layout: "/admin",
    },
    {
        path: "/edit-faq/:id",
        name: "Edit Faq",
        icon: "ni ni-tv-2 text-primary",
        component: FaqEdit,
        layout: "/admin",
    },
    {
        path: "/faq/:id?",
        name: "Faq Detail",
        icon: "ni ni-tv-2 text-primary",
        component: FaqDetail,
        layout: "/admin",
    },
    {
        path: "/articles",
        name: "Articles",
        icon: "ni ni-tv-2 text-primary",
        component: Articles,
        layout: "/admin",
    },
    {
        path: "/add-article",
        name: "Add Article",
        icon: "ni ni-tv-2 text-primary",
        component: ArticleAdd,
        layout: "/admin",
    },
    {
        path: "/edit-article/:id",
        name: "Edit Article",
        icon: "ni ni-tv-2 text-primary",
        component: ArticleEdit,
        layout: "/admin",
    },
    {
        path: "/article/:id?",
        name: "Article Detail",
        icon: "ni ni-tv-2 text-primary",
        component: ArticleDetail,
        layout: "/admin",
    },
    {
        path: "/forms",
        name: "Forms",
        icon: "ni ni-tv-2 text-primary",
        component: Forms,
        layout: "/admin",
    },
    {
        path: "/select",
        name: "Select",
        icon: "ni ni-tv-2 text-primary",
        component: Select,
        layout: "/admin",
    },
    {
        path: "/modal",
        name: "Modal",
        icon: "ni ni-tv-2 text-primary",
        component: Modal,
        layout: "/admin",
    },
    {
        path: "/gradient",
        name: "Gradient",
        icon: "ni ni-tv-2 text-primary",
        component: Gradients,
        layout: "/admin",
    },
];

export default route;