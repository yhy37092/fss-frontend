import React, {useEffect, useState} from "react";
//redux
import {useDispatch, useSelector} from "react-redux";
import {DeleteShare as DeleteShareAction, ListShare as ListShareAction} from "../../reducers";

export const ShareScreen = () => {
    const auth = useSelector(state => state.auth);
    const fss = useSelector(state => state.fss);
    const dispatch = useDispatch();

    const [check,setCheck] = useState(undefined);

    const Delete = async ()=>{
        try {
            check !==undefined && await dispatch(DeleteShareAction(fss.shares[check].sid, auth.token));
            await dispatch(ListShareAction(auth.token));
        } catch (err) {
            window.alert(err);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                await dispatch(ListShareAction(auth.token));
            } catch (err) {
                window.alert(err);
            }
        }

        fetchData();
    }, [auth.token, dispatch]);
    return (
        <div id="content">
            <div className="container-fluid">
                <div className="col">
                    <div className="d-flex align-items-center">
                        <div>
                            <h5 className="mb-0">Share</h5>
                        </div>
                        <div className="ms-auto">
                            <p className="btn btn-sm btn-outline-secondary" onClick={Delete}><i className="fa fa-trash font-24"></i>Delete
                            </p>
                        </div>
                    </div>
                    <div className="table-responsive mt-3">
                        <table className="table table-striped table-hover table-sm mb-0">
                            <thead>
                            <tr>
                                <th></th>
                                <th>SID</th>
                                <th>Path</th>
                            </tr>
                            </thead>
                            <tbody>
                            {fss.shares.map((share, index) =>
                                <tr key={index}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="form-check">
                                                <input checked={index === check} onChange={()=>setCheck(index)} className="form-check-input" type="checkbox"/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="font-weight-bold">{share.sid}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="font-weight-bold">{share.path}</div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}