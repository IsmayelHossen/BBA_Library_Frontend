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
import "../../../index.css";
import "../../BBA_Library/library.css";
import { Link } from "react-router-dom";
import { BaseUrl } from "../CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";
// import Dashboard from "../MainPage/Main/Dashboard";

const PublisherAdd = () => {
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
  const [PublisherData, setPublisherData] = useState([]);
  const [lastDocId, setlastDocId] = useState("");
  const [nextDocId, setnextDocId] = useState("");
  const [categoryData, setcategoryData] = useState("");
  const [lastIdLoadder, setlastIdLoadder] = useState(false);
  useEffect(() => {
    document.title = "DOCUMENTS ADD FORM";

    getPublisher();
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

  const getPublisher = () => {
    axios.get(`${BaseUrl}/library/view/getpublisher`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setPublisherData(res.data.data);
    });
  };

  // submit for add publisher
  const onSubmit = (data) => {
    axios
      .post(`${BaseUrl}/library/create/publisher`, data)
      .then((response) => {
        if (response) {
          console.log(response.data.data);
          window.$("#exampleModal").modal("hide");
          getPublisher();
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //edit publisher

  const EditPublisher = (id) => {
    console.log(Alldata);
    //set update id
    setUpdateId(id);

    const result = PublisherData.filter((data) => data.ID == id);
    setUpdateDataFound(result[0]);
    console.log(result[0]);
  };
  const onSubmitUpdate = async (data) => {
    if (data.id == "") {
      data.id = UpdateDataFound.ID;
    }
    if (data.publisher_name == "") {
      data.publisher_name = UpdateDataFound.PUBLISHER_NAME;
    }

    const updateResult = await axios
      .put(`${BaseUrl}/library/update/publisher/${data.id}`, data)
      .then((response) => {
        if (response.data.success) {
          getPublisher();
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
  const DeletePublisher = (id) => {
    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const abc = await axios
          .delete(`${BaseUrl}/library/delete/publisher/${id}`)
          .then((response) => {
            if (response.data.success) {
              getPublisher();
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
  //search
  const SearchData = (e) => {
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value;
    if (search == "") {
      getPublisher();
    } else {
      const searchby_lowercase = search.toLowerCase();
      axios
        .get(`${BaseUrl}/library/search/publisher/${searchby_lowercase}`)
        .then((response) => {
          console.log(response.data);
          // console.log(response.data.data);

          setPublisherData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //table
  const columns = [
    {
      title: "Place & Publisher Name",
      dataIndex: "PUBLISHER_NAME",
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
                EditPublisher(record.ID);
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
                DeletePublisher(record.ID);
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
                <button
                  type="button"
                  class="Button_success float-right"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  <i class="fa fa-plus"></i> <span>Add Publisher</span>
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
                        <i class="fa fa-plus"></i> Add Place & Publisher
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
                                Place & Publisher Name
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Write Place & Publisher Name"
                                  // defaultValue={nextDocId}
                                  {...register("publisher_name", {
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
                    <div className="table-responsive vendor_table_box">
                      <Table
                        className="table-striped"
                        pagination={{
                          total: PublisherData.length > 0 ? PublisherData : 0,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={PublisherData ? PublisherData : ""}
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
                        <i className="fa fa-pencil m-r-5" /> Update Publisher
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
                              <span style={{ color: "red" }}>*</span> document
                              id
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control bba_documents-form-control"
                                placeholder="Publisher name"
                                defaultValue={UpdateDataFound.PUBLISHER_NAME}
                                {...register1("publisher_name")}
                              />
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

export default PublisherAdd;
