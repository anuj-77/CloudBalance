import React from 'react'
import CopyableCodeContainer from '../../../components/CopyableCodeContainer.jsx/CopyableCodeContainer'
import img6 from '../../../assets/img-6.png';
import img7 from '../../../assets/img-7.png';
import img8 from '../../../assets/img-8.png';

function SubmitPage(formData,) {




    return (
        <div className="onboarding-container">
            <h1 className="onboarding-title">Create Cost & Usage Report</h1>
            <p className="onboarding-subtitle">Create a Cost & Usage Report by following these steps</p>

            <div className="onboarding-box">
                <div className="onboarding-step">
                    <span className="step-number">1</span>
                    <p>
                        Go to <a href="#">Cost and Usage Reports</a> in the Billing Dashboard
                        and click on<b> Create report.</b>
                    </p>
                </div>

                <div className="onboarding-step">
                    <span className="step-number">2</span>
                    <p>
                        Name the report as shown below and select the <b>Include resource IDs</b> checkbox -
                    </p>
                </div>

                <CopyableCodeContainer text="ck-tuner-275595855473-hourly-cur" />

                <div className="onboarding-step">

                    <span style={{ fontSize: "12px" }}>
                        Ensure that the following configuration is checked
                    </span>

                </div>
                <div>
                    <div className="check-icon-row">
                        <span style={{ fontSize: "15px" }}>Include Resource IDs</span>
                    </div>
                    <span>
                        Click on<b> Next</b>
                    </span>
                </div>

                <img src={img6} alt="Specify Report Details" className="onboarding-image" />
                <div className="onboarding-step">
                    <span className="step-number">3</span>
                    <p>
                        In <i>Configure S3 Bucket</i>,
                        provide the name of the S3 bucket that was created -
                    </p>

                </div>
                <div>
                    <span style={{ fontSize: "12px" }}>
                        Ensure that the following configuration is checked
                    </span>

                    <div className="check-icon-row">
                        {/* <FaCheckSquare style={{ color: "grey", marginRight: "8px" }} /> */}
                        <span style={{ fontSize: "15px" }}>
                            The following default policy will be appliet to your bucket
                        </span>
                    </div>
                </div>

                <div
                    style={{ display: "flex", flexDirection: "column", margin: "5px" }}>
                    <span>
                        Click on <b>Save</b>
                    </span>
                    <img src={img7} alt="Configure S3 Bucket Image" className="onboarding-image" />
                </div>

                <div className="onboarding-step">
                    <span className="step-number">4</span>
                    <p>
                        In the <i>Delivery options</i>{" "}
                        section, enter the below-mentioned Report path prefix -
                    </p>

                </div>
                <div style={{ fontSize: "12px" }}>
                    Report path prefix:
                </div>
                <CopyableCodeContainer text="275595855473" />

                <div style={{ fontSize: "12px" }}>
                    Additionally, ensure that the following checks are in place
                </div>
                <div style={{ fontSize: "12px" }}>
                    Time granularity:
                </div>
                <div
                    className="check-icon-row"
                    style={{ display: "flex", alignItems: "center" }}>

                    <span style={{ fontSize: "15px" }}>Hourly</span>
                </div>
                <div style={{ fontSize: "12px" }}>
                    Please make sure these checks are Enabled in Enable report data integration for:
                </div>
                <div className="check-icon-row">
                    {/* <FaCheckSquare style={{ color: "grey", marginRight: "8px" }} /> */}
                    <span style={{ fontSize: "15px" }}>
                        Amazon Athena
                    </span>
                </div>
                <img src={img8} alt="Report Delhivery Option Image" className="onboarding-image" />

                <div className="onboarding-step">
                    <span className="step-number">5</span>
                    <p>Click on <b>Next</b>. Now, review the configuration of the Cost and Usage Report. Once satisfied, click on <b>Create Report</b>.</p>

                </div>

            </div>

        </div>
    )
}

export default SubmitPage
