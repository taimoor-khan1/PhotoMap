import { configureStore } from "@reduxjs/toolkit";
import User from "./Silices/UserType";
import Auth from "../redux/Silices/Auth";
import Content from "../redux/Silices/Content";
import Loader from "../redux/Silices/Loader";
import Profile from "../redux/Silices/Profile";
import Photographers from "../redux/Silices/Photographers";
import Job from "../redux/Silices/Jobs";
import Category from "../redux/Silices/Category";
import Cards from "../redux/Silices/Cards";
import BookingDetail from "../redux/Silices/BookingDetail";
import Notification from "../redux/Silices/Notification";
import Rating from "../redux/Silices/GetRating";

export const store = configureStore({
  reducer: {
    User: User,
    Content: Content,
    Loader: Loader,
    Auth: Auth,
    Profile: Profile,
    Photographers: Photographers,
    Photographers: Photographers,
    Job: Job,
    Cards: Cards,
    Category: Category,
    BookingDetail: BookingDetail,
    Notification: Notification,
    Rating: Rating,
  },
});
