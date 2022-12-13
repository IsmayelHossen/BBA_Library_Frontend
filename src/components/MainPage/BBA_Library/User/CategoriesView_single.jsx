import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

/**
 * for paginationn and data table
 */
import { Table } from "antd";
import "../../antdstyle.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
/**
 * for paginationn and data table end
 */
import swal from "sweetalert";

import "../../BBA_Library/library.css";
import { Link, useParams } from "react-router-dom";
import { BaseUrl } from "../CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";
import { data } from "jquery";
// import useAuth from "../../../initialpage/hooks/useAuth";
import useAuth from "../../BBA_Library/useAuth";

const CategoriesView_single = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState();
  const [PublisherData, setPublisherData] = useState([]);
  const [lastDocId, setlastDocId] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  const [BooksData, setBooksData] = useState([]);
  const [requestSendLodder, setrequestSendLodder] = useState(false);
  const { category } = useParams();
  const [sendRequestStatus, setsendRequestStatus] = useState(false);
  const [BookNumberForRequestSend, setBookNumberForRequestSend] = useState("");
  const { user } = useAuth();
  const employeeId = user ? user.employe_id : 685;
  console.log(user, employeeId);
  useEffect(() => {
    document.title = "DOCUMENTS ADD FORM";
    getBooks();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const {
    reset: reset1,
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors2 },
  } = useForm();

  const getBooks = () => {
    axios.get(`${BaseUrl}/library/view/getbooks`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setBooksData(res.data.data);
    });
  };

  //search
  const SearchData = (e) => {
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value;
    if (search == "") {
      getBooks();
    } else {
      const searchby_lowercase = search.toLowerCase();
      axios
        .get(`${BaseUrl}/library/search/categoriesBook/${searchby_lowercase}`)
        .then((response) => {
          console.log(response.data);
          // console.log(response.data.data);

          setBooksData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  //   const Calculate_individual_book = (category) => {
  //     const result = BooksData?.filter((data) => data.CATEGORY_NAME == category);
  //     return result.length;
  //   };
  const CategoryBook = BooksData?.filter(
    (data) => data.CATEGORY_NAME == category
  );

  const RequestSend = async (bookNum) => {
    setrequestSendLodder(true);
    console.log(bookNum);
    const Otp = Math.floor(Math.random() * 1000000);
    var request_date = new Date().toLocaleDateString();
    var request_date_day = request_date.split("/")[1];
    var request_date_month = request_date.split("/")[0];
    var request_date_year = request_date.split("/")[2];
    var request_date1 =
      request_date_day + "/" + request_date_month + "/" + request_date_year;
    console.log(request_date);
    const data = {
      bookNum: bookNum,
      emplyee_id: employeeId,
      request_date: request_date1,
      otp: Otp,
    };
    await axios
      .post(`${BaseUrl}/library/create/requestSend`, data)
      .then((res) => {
        if (res.data.success1 == "NotEligible") {
          swal(
            "Sorry Limit Exceeded,only 4 books can be kept at a time.Thank You!",
            "",
            "warning"
          );
        } else if (res.data.success2 == "OnGoningAlready") {
          swal(
            "This book is on going service.Please return or renew it!Thanks",
            "",
            "warning"
          );
        } else {
          if (res.data.success) {
            //static librarian number
            const librarian_mobile = 8801624033194;
            // form login data
            // const Emp_mobile = 8801952152883;
            const Emp_mobile = 88 + UpdateDataFound.MOBILE;
            const Emp_Name = "xyz";
            const Emp_deg = "Programmer";
            const Book_num = bookNum;

            const Msg_Librarian = `${Emp_Name}(${Emp_deg}) Sent request for book borrow and Book serial number is ${Book_num}`;
            const Msg_User = `Your Book request which serial number ${Book_num} is sent to the librarian.OTP is ${Otp}`;
            //sms send  for librarian
            axios
              .get(
                `https://eservice.bba.gov.bd/api/sms?mobile=${librarian_mobile}&apikey=$2a$12$X3ydCr5No7MfKe2aFNJriuVl5YIXQH3thNA.dD.eD0FOmSf92eP2O&message=${Msg_Librarian}`
              )
              .then((res) => {
                if (res.data.status === "SUCCESS") {
                  // sms send for user
                  axios
                    .get(
                      `https://eservice.bba.gov.bd/api/sms?mobile=${Emp_mobile}&apikey=$2a$12$X3ydCr5No7MfKe2aFNJriuVl5YIXQH3thNA.dD.eD0FOmSf92eP2O&message=${Msg_User}`
                    )
                    .then((res) => {
                      if (res.data.status === "SUCCESS") {
                        setrequestSendLodder(false);
                        setsendRequestStatus(true);
                        setBookNumberForRequestSend(bookNum);
                        swal("Request Sent Successfully", "", "success");
                      }
                    });
                }
              });
          }
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Dashboard - BBA Library </title>
        <meta name="description" content="BBA STORE" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div class="">
            <div class="card-header1">
              <div className="">
                <h4
                  className="text-center mx-auto mb-3 text-uppercase fddd"
                  id="hddd"
                >
                  BBA Library
                </h4>
              </div>
              {/* header */}
              <div className="d-flex justify-content-between align-items-center Page_header_title_search">
                <div
                  class="form-group has-search"
                  style={{ marginBottom: "0px" }}
                >
                  <span class="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    class="form-control bba_documents-form-control"
                    value={searchdata}
                    name="searchStatus"
                    placeholder="Search"
                    onChange={(e) => SearchData(e)}
                  />
                </div>

                <button type="button" class="Button_success float-right">
                  Category/ {category}:{CategoryBook && CategoryBook.length}
                </button>
              </div>
            </div>
            <div class="card-body1">
              <div className="row">
                <div className="col-md-12">
                  {DataLoader && (
                    <>
                      <div class="row">
                        <div class="col-md-5"></div>
                        <div class="col-md-2 mt-4">
                          <ColorRing
                            visible={true}
                            height="80"
                            width={100}
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={[
                              "#e15b64",
                              "#f47e60",
                              "#f8b26a",
                              "#abbd81",
                              "#849b87",
                            ]}
                          />
                        </div>
                        <div class="col-md-5"></div>
                      </div>
                    </>
                  )}
                  {!DataLoader && (
                    <div className="vendor_table_box mt-2">
                      <div class="row">
                        {CategoryData &&
                          CategoryBook.map((row, index) => (
                            <div class="col-md-4">
                              <div class="library_category_box_singel">
                                <div class="row ">
                                  {requestSendLodder && (
                                    <>
                                      <div class="row">
                                        <div class="col-md-5"></div>
                                        <div class="col-md-2 mt-4">
                                          <ColorRing
                                            visible={true}
                                            height="80"
                                            width={100}
                                            ariaLabel="blocks-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="blocks-wrapper"
                                            colors={[
                                              "#e15b64",
                                              "#f47e60",
                                              "#f8b26a",
                                              "#abbd81",
                                              "#849b87",
                                            ]}
                                          />
                                        </div>
                                        <div class="col-md-5"></div>
                                      </div>
                                    </>
                                  )}
                                  <div class="col-md-12 ">
                                    <div class="image_display">
                                      <img
                                        src={`${BaseUrl}/uploadDoc/${row.IMAGE}`}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <h5>{row.TITLE}</h5>
                                <p>Book Serial No:{row.BOOK_NUM}</p>
                                <p>Author:{row.AUTHOR}</p>
                                <p>Place & Publication:{row.PUBLISHER_NAME}</p>
                                <p>Volume & Edition:{row.VOLUME_EDITION}</p>
                                <div>
                                  Number of Copy:{row.NUMBER_OF_COPY}
                                  <span class="pl-3">
                                    Available:{" "}
                                    <badge>{row.AVAILABLE_COPY}</badge>
                                  </span>
                                </div>
                                {row.AVAILABLE_COPY > 0 ? (
                                  <>
                                    {sendRequestStatus &&
                                    BookNumberForRequestSend == row.BOOK_NUM ? (
                                      <button class="mt-2 btn btn-default float-right clearfix">
                                        Request Sent
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          RequestSend(row.BOOK_NUM)
                                        }
                                        class="mt-2 Button_primary1 float-right clearfix"
                                      >
                                        Send Request
                                      </button>
                                    )}
                                  </>
                                ) : (
                                  <button class="mt-2 Button_Danger1 float-right clearfix">
                                    Not Available
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesView_single;
