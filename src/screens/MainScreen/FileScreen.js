import React, {useEffect, useState} from "react";
//redux
import {useDispatch, useSelector} from "react-redux";
import {
    ListDir as ListDirAction,
    CreateShare as CreateShareAction,
    DeleteFile as DeleteFileAction,
    ChangePath as ChangePathAction,
} from "../../reducers";
import {NewDirButton} from "./components";
import {UploadFileButton} from "./components/UploadFileButton";

export const FileScreen = () => {
    const auth = useSelector(state => state.auth);
    const fss = useSelector(state => state.fss);
    const dispatch = useDispatch();

    const [check,setCheck] = useState(undefined);
    const Share = async ()=>{
        try {
            let path = fss.path;
            if(path.endsWith("/")) path = path.concat(fss.files[check].name);
            else path = path.concat("/",fss.files[check].name);
            check !==undefined && await dispatch(CreateShareAction(path, auth.token));
        } catch (err) {
            window.alert(err);
        }
    };

    const Change = async (name)=> {
        try {
            let path = fss.path;
            if(path.endsWith("/")) path = path.concat(name);
            else path = path.concat("/",name);
            await dispatch(ChangePathAction(path));
        } catch (err) {
            window.alert(err);
        }
    };

    const Delete = async ()=>{
        try {
            check !==undefined && await dispatch(DeleteFileAction(fss.path,fss.files[check].name, auth.token));
            await dispatch(ListDirAction(fss.path, auth.token));
        } catch (err) {
            window.alert(err);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                await dispatch(ListDirAction(fss.path, auth.token));
            } catch (err) {
                window.alert(err);
            }
        }

        fetchData();
    }, [auth.token, dispatch, fss.path]);
    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="col">
                        <div className="d-flex align-items-center">
                            <div>
                                <h5 className="mb-0">Path: {fss.path}</h5>
                            </div>
                            <div className="ms-auto">
                                <NewDirButton/>
                                <UploadFileButton/>
                                <p className="btn btn-sm btn-outline-secondary" onClick={Share}><i className="fa fa-share font-24"></i>Share
                                </p>
                                <p className="btn btn-sm btn-outline-secondary" onClick={Delete}><i className="fa fa-trash font-24"></i>Delete
                                </p>
                            </div>
                        </div>
                        <div className="table-responsive mt-3">
                            <table className="table table-striped table-hover table-sm mb-0">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Size</th>
                                </tr>
                                </thead>
                                <tbody>
                                {fss.files.map((file, index) => file.type === "dir" ?
                                    <tr key={index}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="form-check">
                                                    <input checked={index === check} onChange={()=>setCheck(index)} className="form-check-input" type="checkbox"/>
                                                </div>
                                            </div>
                                        </td>
                                        <td onClick={()=>Change(file.name)}>
                                            <div className="d-flex align-items-center">
                                                <div><i className="fa fa-folder font-24"></i>
                                                </div>
                                                <div className="font-weight-bold">{file.name}</div>
                                            </div>
                                        </td>
                                        <td onClick={()=>Change(file.name)}></td>
                                    </tr>
                                    :
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
                                                <div><i className="fa fa-file font-24"></i>
                                                </div>
                                                <div className="font-weight-bold"><a href={"/"+fss.files[check].hash}>{file.name}</a></div>
                                            </div>
                                        </td>
                                        <td>{file.length}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}