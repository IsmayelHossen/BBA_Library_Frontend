/**
 * Vendor Add Information component
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

/**
 * for paginationn and data table
 */
import { Table } from "antd";
import "../antdstyle.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
/**
 * for paginationn and data table end
 */
import swal from "sweetalert";
import "../../../index.css";
import "../BBA_Documents/vendor.css";
import { Link } from "react-router-dom";

import ViewDocuments from "./ViewDocuments";
import { BaseUrl } from "./CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";
// import Dashboard from "../MainPage/Main/Dashboard";

const Create_Document = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState();
  const [file, setFile] = useState([]);
  const [intialValue, setintialValue] = useState({
    id: "",
    name: "",
  });
  const [progress, setProgress] = useState("");
  const [progressShow, setprogressShow] = useState(false);
  const [documentType, setdocumentType] = useState("");
  const [lastDocId, setlastDocId] = useState("");
  const [nextDocId, setnextDocId] = useState("");
  const [categoryData, setcategoryData] = useState("");
  const [lastIdLoadder, setlastIdLoadder] = useState(false);
  useEffect(() => {
    document.title = "DOCUMENTS ADD FORM";

    getDataapicall();
    getCategory();
  }, []);

  const getDataapicall = () => {
    axios.get(`${BaseUrl}/documents/getdata`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setdata(res.data.data);
    });
  };
  const getCategory = () => {
    axios.get(`${BaseUrl}/documents/category/view`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setcategoryData(res.data.data);
    });
  };
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

  //get last documents id
  const handleOnchangeforlast_id = async (e) => {
    setdocumentType(e.target.value);

    console.log(e.target.value);
    await axios
      .get(`${BaseUrl}/documents/getlastId/${e.target.value}`)
      .then((res) => {
        setlastDocId(Number(res.data.data[0].ID));
        setnextDocId(Number(res.data.data[0].ID) + 1);
        setlastIdLoadder(true);
      });
  };

  // submit for store documents

  const onSubmit = (data) => {
    setprogressShow(true);
    var datentime = new Date().toLocaleString();
    var date = datentime.split("/")[1];
    var month = datentime.split("/")[0];
    var year = datentime.split(",")[0].split("/")[2];
    var time = datentime.split(",")[1];
    var RearangeTime = date + "/" + month + "/" + year + "," + time;
    console.log(RearangeTime);
    const employee_id = 685;
    const formData = new FormData();
    var meeting_date = data.meeting_date;
    var meeting_date_day = meeting_date.split("-")[2];
    var meeting_date_month = meeting_date.split("-")[1];
    var meeting_date_year = meeting_date.split("-")[0];
    var rearrange_meeting_date =
      meeting_date_day + "/" + meeting_date_month + "/" + meeting_date_year;
    console.log(rearrange_meeting_date);

    if (data.doc_id == "") {
      data.doc_id = nextDocId;
    }

    formData.append("datentime", RearangeTime);
    formData.append("id", data.doc_id);
    formData.append("name", documentType);
    formData.append("employee_id", employee_id);
    formData.append("meeting_date", rearrange_meeting_date);
    console.log(data);
    if (data.documents.length > 1) {
      for (let i = 0; i < data.documents.length; i++) {
        formData.append("documents", data.documents[i]);
      }
    } else {
      formData.append("documents", data.documents[0]);
    }
    axios
      .post(`${BaseUrl}/documents/process_post`, formData, {
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          console.log(data);
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((response) => {
        if (response) {
          console.log(response.data.data);
          window.$("#exampleModal").modal("hide");
          getDataapicall();
          reset();
          setnextDocId("");
          setdocumentType("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditIndividual = (id) => {
    console.log(Alldata);
    //set update id
    setUpdateId(id);

    const result = Alldata.filter((data) => data.ID == id);
    setUpdateDataFound(result[0]);
    console.log(result[0]);
  };

  const onSubmitUpdate = async (data) => {
    if (data.document_id == "") {
      data.document_id = UpdateDataFound.MEETING_ID;
    }
    if (data.name == "") {
      data.name = UpdateDataFound.NAME;
    }
    if (data.id == "") {
      data.id = UpdateDataFound.ID;
    }
    if (data.meeting_date == "") {
      data.meeting_date = UpdateDataFound.MEETING_DATE;
    }

    console.log(data);

    const updateResult = await axios
      .put(`${BaseUrl}/documents/update/${data.id}`, data)
      .then((response) => {
        if (response.data.success) {
          getDataapicall();
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

    // console.log(UpdateDataFound);
  };

  //data delete
  const DeleteIndividual_vendor = (id) => {
    setvendorDeleteId(id);

    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const abc = await axios
          .delete(`${BaseUrl}/documents/delete/${id}`)
          .then((response) => {
            if (response.data.success) {
              getDataapicall();
              swal("Successfully Deleted!Thank You", "", "success");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        swal("Record is not delete!");
      }
    });
  };

  //search vendor
  const SearchData = (e) => {
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value;
    if (search == "") {
      getDataapicall();
    } else {
      const searchby_lowercase = search.toLowerCase();
      axios
        .get(`${BaseUrl}/documents/search/${searchby_lowercase}`)
        .then((response) => {
          console.log(response.data);
          // console.log(response.data.data);
          setdata("");
          setdata(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //table
  const columns = [
    // {
    //   title: "Entry By",
    //   dataIndex: "NAME_1",
    // },
    // {
    //   title: "Designation",
    //   dataIndex: "DES_NAME",
    // },
    {
      title: "Documents Type",
      dataIndex: "NAME",
    },
    {
      title: "Documents ID",
      dataIndex: "MEETING_ID",
    },

    {
      title: "Held on the date",
      dataIndex: "MEETING_DATE",
    },
    {
      title: "Entry Date & Time",
      // dataIndex: "DATENTIME",
      render: (text, record) => <>{record.DATENTIME}</>,
    },

    {
      title: "Documents Details",

      render: (text, record) => (
        <>
          <Link
            className="btn btn-success btn-sm"
            to={`/docs/viewDocuments/${record.ID}/${record.MEETING_ID}`}
          >
            <span class="fa fa-eye"></span>
          </Link>
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
                EditIndividual(record.ID);
              }}
            >
              <i
                className="fa fa-pencil"
                style={{ fontSize: "20px", color: "white" }}
              />
            </a>
            &nbsp; &nbsp; &nbsp;
            <a
              className="btn btn-danger btn-sm"
              href="#"
              onClick={() => {
                DeleteIndividual_vendor(record.ID);
              }}
            >
              <i
                className="fa fa-trash-o"
                style={{ fontSize: "20px", color: "white" }}
              />
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {console.log("render344")}
      <Helmet>
        <title>Dashboard - BBA Document </title>
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
                  Welcome To BBA Archive
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
                    placeholder="Search by type,id,held date"
                    onChange={(e) => SearchData(e)}
                  />
                </div>
                <button
                  type="button"
                  class="Button_success float-right"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  <i class="fa fa-plus"></i> <span>Add Document</span>
                </button>
              </div>
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
                        <i class="fa fa-plus"></i> Add Document
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
                                <span style={{ color: "red" }}>*</span>Document
                                Type
                              </label>
                              <div className="col-sm-8">
                                <select
                                  class="form-select form-control bba_documents-form-control"
                                  {...register("document_type", {
                                    onChange: (e) => {
                                      handleOnchangeforlast_id(e);
                                    },
                                    required: true,
                                  })}
                                >
                                  <option value="">Select Type</option>
                                  {categoryData.length > 0 && (
                                    <>
                                      {categoryData.map((row, index) => (
                                        <option value={row.CATEGORY_NAME}>
                                          {row.CATEGORY_NAME}
                                        </option>
                                      ))}
                                    </>
                                  )}
                                </select>
                              </div>
                            </div>

                            {/* after select category this secton will show ..start*/}
                            {documentType != "" && (
                              <>
                                <div className="mb-2 row">
                                  <label
                                    for="inputtext"
                                    class="col-sm-4 col-form-label"
                                  >
                                    {" "}
                                    <span style={{ color: "red" }}>*</span>
                                    Document Id
                                  </label>
                                  <div className="col-sm-8">
                                    {!lastIdLoadder && (
                                      <>
                                        <div
                                          class="spinner-border text-primary"
                                          role="status"
                                        >
                                          <span class="visually-hidden">
                                            Loading...
                                          </span>
                                        </div>
                                      </>
                                    )}
                                    <input
                                      type="text"
                                      class="form-control bba_documents-form-control"
                                      placeholder="Document ID"
                                      // defaultValue={nextDocId}
                                      {...register("doc_id", {
                                        required: true,
                                      })}
                                    />
                                    <span>
                                      Last Document entry number is:
                                      {lastDocId == null ? "0" : lastDocId} &
                                      next will be{" "}
                                      <span style={{ color: "red" }}>
                                        {nextDocId}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </>
                            )}

                            {/* after select category this secton will show ..end*/}

                            <div className="mb-2 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>Held on
                                the date
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="date"
                                  class="form-control bba_documents-form-control"
                                  id="validationDefault03"
                                  placeholder="Held on the date"
                                  {...register("meeting_date", {
                                    // onChange: (e) => {handleOnchange(e)},
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>

                            <div className="mb-2 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>Document
                                File
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="file"
                                  id="customFile"
                                  class=" bba_documents-form-control"
                                  {...register("documents", {
                                    required: true,
                                  })}
                                  multiple
                                />
                              </div>
                              {progressShow && (
                                <>
                                  <div class="progress mb-2">
                                    <div
                                      class="progress-bar progress-bar-striped bg-success"
                                      role="progressbar"
                                      style={{ width: `${progress}%` }}
                                    >
                                      {progress}%
                                    </div>
                                  </div>
                                </>
                              )}
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
                    <div className="table-responsive vendor_table_box">
                      <Table
                        className="table-striped"
                        pagination={{
                          total: Alldata.length > 0 ? Alldata : 0,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={Alldata ? Alldata : ""}
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
                        <i className="fa fa-pencil m-r-5" /> Update Document
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
                    {/* handleSubmit1(onSubmit1) */}
                    {/* vendor update form */}
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
                              <span style={{ color: "red" }}>*</span> document
                              id
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control bba_documents-form-control"
                                placeholder="Id"
                                defaultValue={UpdateDataFound.MEETING_ID}
                                {...register1("document_id")}
                              />
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span> Held on
                              the date
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control bba_documents-form-control"
                                placeholder="Held on the date"
                                defaultValue={UpdateDataFound.MEETING_DATE}
                                {...register1("meeting_date")}
                              />
                            </div>
                          </div>
                          <div className="mb-2 row ">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>Documents
                              Type
                            </label>
                            {/* <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control bba_documents-form-control"
                                placeholder=" Document Types"
                                id="validationDefault07"
                                defaultValue={UpdateDataFound.NAME}
                                {...register1("name")}
                              />
                            </div> */}

                            <div className="col-sm-8">
                              <select
                                class="form-select form-control bba_documents-form-control"
                                {...register1("name")}
                              >
                                {categoryData.length > 0 && (
                                  <>
                                    {categoryData.map((row, index) => (
                                      <>
                                        {row.CATEGORY_NAME ==
                                          UpdateDataFound.NAME && (
                                          <option
                                            value={row.CATEGORY_NAME}
                                            selected="selected"
                                          >
                                            {UpdateDataFound.NAME}
                                          </option>
                                        )}

                                        {row.CATEGORY_NAME !=
                                          UpdateDataFound.NAME && (
                                          <option value={row.CATEGORY_NAME}>
                                            {row.CATEGORY_NAME}
                                          </option>
                                        )}
                                      </>
                                    ))}
                                  </>
                                )}
                              </select>
                            </div>
                          </div>

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

export default Create_Document;
