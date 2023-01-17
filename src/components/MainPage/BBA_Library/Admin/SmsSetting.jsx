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
import { Link } from "react-router-dom";
import { BaseUrl } from "../CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";
// import Dashboard from "../MainPage/Main/Dashboard";

const SmsSetting = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [SmsSettingData, setSmsSettingData] = useState([]);
  const [UpdateId, setUpdateId] = useState();
  const [CategoryData, setCategoryData] = useState([]);
  useEffect(() => {
    document.title = "LIBRARY ADD FORM";

    getCategory();
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
  //get publisher

  const getCategory = () => {
    axios.get(`${BaseUrl}/library/view/getSmsSettingsData`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setSmsSettingData(res.data.data);
    });
  };

  // submit for add publisher
  const onSubmit = (data) => {
    axios
      .post(`${BaseUrl}/library/create/category`, data)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.data);
          window.$("#exampleModal").modal("hide");
          getCategory();
          reset();
        } else {
          swal("This Category is already exists", "", "warning");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //edit publisher

  const EditCategory = (id) => {
    //set update id
    setUpdateId(id);
    reset1();
    const result = SmsSettingData.filter((data) => data.ID == id);
    setUpdateDataFound(result[0]);
    console.log(result[0]);
  };
  const onSubmitUpdate = async (data) => {
    if (data.USER_REQUESTSMS !== "") {
      UpdateDataFound.USER_REQUESTSMS = data.USER_REQUESTSMS;
    }
    if (data.LIB_GETREQUESTSMS !== "") {
      UpdateDataFound.LIB_GETREQUESTSMS = data.LIB_GETREQUESTSMS;
    }
    if (data.USER_REQUESTACCEPTSMS !== "") {
      UpdateDataFound.USER_REQUESTACCEPTSMS = data.USER_REQUESTACCEPTSMS;
    }
    if (data.USER_BOOKRETURNSMS !== "") {
      UpdateDataFound.USER_BOOKRETURNSMS = data.USER_BOOKRETURNSMS;
    }
    const updateResult = await axios
      .put(`${BaseUrl}/library/update/smsSettings/${UpdateId}`, UpdateDataFound)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          getCategory();
          swal({
            title: "Updated Successfully!",
            icon: "success",
            button: "Ok!",
          });
          reset1();
          window.$("#vendor_update").modal("hide");
        }
      })

      .catch((error) => {
        console.log(error);
        console.log(data);
      });
  };

  //table
  const columns = [
    {
      title: "Book Request OTP Sms",

      render: (text, record) => (
        <>
          {record.USER_REQUESTSMS == 1 ? (
            <p>
              Send to User:<span style={{ color: "green" }}>True</span>
            </p>
          ) : (
            <p>
              Send to User:<span style={{ color: "red" }}>False</span>
            </p>
          )}
        </>
      ),
    },
    {
      title: " Book Request Sms",

      render: (text, record) => (
        <>
          {record.LIB_GETREQUESTSMS == 1 ? (
            <p>
              Send to Librarian to inform:
              <span style={{ color: "green" }}>True</span>
            </p>
          ) : (
            <p>
              Send to Librarian to inform:
              <span style={{ color: "red" }}>False</span>
            </p>
          )}
        </>
      ),
    },
    {
      title: "Book Request Accepted Sms",

      render: (text, record) => (
        <>
          {record.USER_REQUESTACCEPTSMS == 1 ? (
            <p>
              Send to User:<span style={{ color: "green" }}>True</span>
            </p>
          ) : (
            <p>
              Send to User:<span style={{ color: "red" }}>False</span>
            </p>
          )}
        </>
      ),
    },
    {
      title: "Librarian got the  Return Book Sms",

      render: (text, record) => (
        <>
          {record.USER_BOOKRETURNSMS == 1 ? (
            <p>
              Send to User:<span style={{ color: "green" }}>True</span>
            </p>
          ) : (
            <p>
              Send to User:<span style={{ color: "red" }}>False</span>
            </p>
          )}
        </>
      ),
    },

    {
      title: "Action",
      render: (text, record) => (
        <div className="">
          <div className="">
            <a
              className="btn btn-primary btn-sm"
              href="#"
              data-toggle="modal"
              data-target="#vendor_update"
              onClick={() => {
                EditCategory(record.ID);
              }}
            >
              <i
                className="fa fa-pencil"
                style={{ fontSize: "20px", color: "white" }}
              />
            </a>
            &nbsp; &nbsp; &nbsp;
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      {console.log("render344")}
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
            </div>
            <div class="card-body1">
              {/* /Page Header */}
              <div
                class="modal custom-modal fade "
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                {/* ADD DOCUMENT START */}

                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content modal-content_docs">
                    <div class="modal-header">
                      <h5 style={{ color: "rgba(17, 123, 108, 0.85)" }}>
                        <i class="fa fa-plus"></i> Add Category
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body ">
                      <div className="row Product_add">
                        {/* vendor form */}

                        <div class="col-md-12">
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            class="form_design"
                          >
                            <div className="mb-2 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>
                                Category Name
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Write Category Name"
                                  // defaultValue={nextDocId}
                                  {...register("category_name", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>

                            <div className="SubmitFooter">
                              <button
                                type="submitupdate"
                                class="Button_success"
                              >
                                <span>Add</span>
                              </button>
                              <button
                                type="button"
                                class="Button_Danger1"
                                data-dismiss="modal"
                              >
                                <span> Close</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*ADD DOCUMENT END*/}

              {/* table start */}
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
                    <div className="table-responsive vendor_table_box sms_settings">
                      <Table
                        className="table-striped"
                        pagination={{
                          total:
                            SmsSettingData?.length > 0 ? SmsSettingData : 0,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={SmsSettingData ? SmsSettingData : ""}
                        rowKey={(record) => record.id}
                        onChange={console.log("chnage")}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* update vendor modal start */}

              <div
                class="modal custom-modal fade "
                id="vendor_update"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content modal-content_docs">
                    <div class="modal-header">
                      <h6
                        class="modal-title"
                        id="exampleModalLabel"
                        style={{
                          fontWeight: "600",
                          color: "#5265ac",
                          fontSize: "15px",
                        }}
                      >
                        <i className="fa fa-pencil m-r-5" /> Update SMS Settings
                        {/*UpdateDataFound.id*/}
                      </h6>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    {/* publisher update form */}
                    <div class="modal-body ">
                      <div className="row Product_add">
                        {/* vendor form */}
                        <form
                          onSubmit={handleSubmit1(onSubmitUpdate)}
                          class="form_design"
                        >
                          <div className="mb-2 row" style={{ display: "none" }}>
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>id
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="number"
                                class="form-control bba_documents-form-control"
                                placeholder="Id"
                                defaultValue={UpdateDataFound.ID}
                                {...register1("id")}
                              />
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>Book
                              Request OTP Sms Send to User
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="number"
                                class="form-control bba_documents-form-control"
                                defaultValue={UpdateDataFound.USER_REQUESTSMS}
                                {...register1("USER_REQUESTSMS")}
                              />
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>Book
                              Request Sms Send to Librarian to inform
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="number"
                                class="form-control bba_documents-form-control"
                                defaultValue={UpdateDataFound.LIB_GETREQUESTSMS}
                                {...register1("LIB_GETREQUESTSMS")}
                              />
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>Book
                              Request Accepted Sms Send to User
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="number"
                                class="form-control bba_documents-form-control"
                                defaultValue={
                                  UpdateDataFound.USER_REQUESTACCEPTSMS
                                }
                                {...register1("USER_REQUESTACCEPTSMS")}
                              />
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>Librarian
                              got the Return Book Sms Send to User
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="number"
                                class="form-control bba_documents-form-control"
                                defaultValue={
                                  UpdateDataFound.USER_BOOKRETURNSMS
                                }
                                {...register1("USER_BOOKRETURNSMS")}
                              />
                            </div>
                          </div>
                          <p
                            style={{
                              textAlign: "left",
                              padding: "0px",
                            }}
                          >
                            <span style={{ color: "red" }}>Note</span>:0 for
                            False & 1 for True
                          </p>
                          <div className="SubmitFooter">
                            <button type="submit" class="Button_success">
                              <span>Update</span>
                            </button>
                            <button
                              type="button"
                              class="Button_Danger1"
                              data-dismiss="modal"
                            >
                              <span> Close</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* update vendor modal end  */}
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default SmsSetting;
