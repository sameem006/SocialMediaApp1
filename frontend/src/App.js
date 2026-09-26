import Nav from "./Nav";
import Missing from "./Missing";
import NewPost from "./NewPost";
import Header from "./Header";
import Home from "./Home";
import PostPage from "./PostPage";
import About from "./About";
import { Route, Routes, Navigate } from "react-router-dom";
import Footer from "./Footer";
import Edit from "./Edit";

import { DataProvider, DataContext } from "./context/DataContext";
import Signup from "./pages/signup/signUp";
import Login from "./pages/login/login";

import { useContext } from "react";

function AppRoutes() {
      const { isLoggedIn, checkingAuth } = useContext(DataContext);

      if (checkingAuth) {
            return <p>Checking Auth !! wait</p>;
      }

      return (
            <Routes>
                  {/* HOME */}
                  <Route
                        path="/"
                        element={
                              isLoggedIn ? (
                                    <div className="App">
                                          <Header title="social media" />
                                          <Nav />
                                          <Home />
                                          <Footer />
                                    </div>
                              ) : (
                                    <Navigate to="/login" replace />
                              )
                        }
                  />

                  <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />

                  <Route path="/signup" element={isLoggedIn ? <Navigate to="/" replace /> : <Signup />} />

                  <Route
                        path="/post"
                        element={
                              isLoggedIn ? (
                                    <div className="App">
                                          <Header title="social media" />
                                          <Nav />
                                          <NewPost />
                                          <Footer />
                                    </div>
                              ) : (
                                    <Navigate to="/login" replace />
                              )
                        }
                  />

                  <Route
                        path="/post/:id"
                        element={
                              isLoggedIn ? (
                                    <div className="App">
                                          <Header title="social media" />
                                          <Nav />
                                          <PostPage />
                                          <Footer />
                                    </div>
                              ) : (
                                    <Navigate to="/login" replace />
                              )
                        }
                  />

                  <Route
                        path="/edit/:id"
                        element={
                              isLoggedIn ? (
                                    <div className="App">
                                          <Header title="social media" />
                                          <Nav />
                                          <Edit />
                                          <Footer />
                                    </div>
                              ) : (
                                    <Navigate to="/login" replace />
                              )
                        }
                  />

                  <Route
                        path="/about"
                        element={
                              isLoggedIn ? (
                                    <div className="App">
                                          <Header title="social media" />
                                          <Nav />
                                          <About />
                                          <Footer />
                                    </div>
                              ) : (
                                    <Navigate to="/login" replace />
                              )
                        }
                  />

                  <Route path="*" element={<Missing />} />
            </Routes>
      );
}

function App() {
      return (
            <DataProvider>
                  <AppRoutes />
            </DataProvider>
      );
}

export default App;
