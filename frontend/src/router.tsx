import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Home } from "./pages/Home";
import { CreateBook } from "./pages/CreateBook";
import { ShowBook } from "./pages/ShowBook";
import { EditBook } from "./pages/EditBook";
import { DeleteBook } from "./pages/DeleteBook";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/books/create',
        element: <CreateBook />
    },
    {
        path: '/books/details/:id',
        element: <ShowBook />
    },
    {
        path: '/books/edit/:id',
        element: <EditBook /> 
    },
    {
        path: '/books/delete/:id',
        element: <DeleteBook />
    },
    {
        path: '*',
        element: <NotFound />
    }
])