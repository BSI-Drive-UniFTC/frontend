import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "pages/auth/SignIn";
import SignUp from "pages/auth/SignUp";
import ForgotPassword from "pages/auth/ForgotPassword";
import PrivateLayout from "components/PrivateLayout";
import NotFound from "pages/Public/404";
import { AuthProvider } from "context/auth";
import Palette from "context/theme";
import ResetPassword from "pages/auth/ResetPassword";
import ProjectRegistration from "pages/ProjectRegistration";
import ConsultProject from "pages/ConsultProject";
import SubjectRegistration from "pages/SubjectRegistration";

function routes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Palette>
                    <Routes>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/SignUp" element={<SignUp />} />
                        <Route path="/ForgotPassword" element={<ForgotPassword />} />
                        <Route path="/ResetPassword" element={<ResetPassword />} />
                        <Route element={<PrivateLayout />}>
                            <Route path="/ProjectRegistration" element={<ProjectRegistration />} />
                            <Route path="/ConsultProject" element={<ConsultProject />} />
                            <Route path="/SubjectRegistration" element={<SubjectRegistration />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Palette>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default routes;
