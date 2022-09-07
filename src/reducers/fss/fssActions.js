import {API_URL} from '../../utils/Config';
import {timeoutPromise} from '../../utils/Tools';

export const FSS_LOADING = 'FSS_LOADING';
export const FSS_FAILURE = 'FSS_FAILURE';
export const FSS_LISTFILE = 'FSS_LISTFILE';
export const FSS_SHARE = 'FSS_SHARE';
export const FSS_LISTSHARE = 'FSS_LISTSHARE';
export const FSS_CREATEDIR = 'FSS_CREATEDIR';
export const FSS_DELETEFILE = 'FSS_DELETEFILE';
export const FSS_CHANGEPATH = 'FSS_CHANGEPATH';
export const FSS_UPLOADFILE = 'FSS_UPLOADFILE';

export const ChangePath = (path) => {
    return async dispatch => {
        dispatch({
            type: FSS_LOADING,
        });
        try {
            dispatch({
                path:path,
                type: FSS_CHANGEPATH,
            });
        } catch (err) {
            throw err;
        }
    };
};

export const CreatDir = (path,name,token) => {
    return async dispatch => {
        dispatch({
            type: FSS_LOADING,
        });
        try {
            const response = await timeoutPromise(
                fetch(`${API_URL}/fss/create_dir`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        path,
                        name,
                        token,
                    }),
                }),
            );
            const resData = await response.json();
            if (!response.ok) {
                dispatch({
                    type: FSS_FAILURE,
                });
                throw new Error(resData.error);
            }
            dispatch({
                type: FSS_CREATEDIR,
            });
        } catch (err) {
            throw err;
        }
    };
};

export const ListDir = (path,token) => {
    return async dispatch => {
        dispatch({
            type: FSS_LOADING,
        });
        try {
            const response = await timeoutPromise(
                fetch(`${API_URL}/fss/list_dir`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        path,
                        token,
                    }),
                }),
            );
            const resData = await response.json();
            if (!response.ok) {
                dispatch({
                    type: FSS_FAILURE,
                });
                throw new Error(resData.error);
            }
            dispatch({
                files:resData.files,
                type: FSS_LISTFILE,
            });
        } catch (err) {
            throw err;
        }
    };
};

export const ListShare = (token) => {
    return async dispatch => {
        dispatch({
            type: FSS_LOADING,
        });
        try {
            const response = await timeoutPromise(
                fetch(`${API_URL}/fss/list_share`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        token,
                    }),
                }),
            );
            const resData = await response.json();
            if (!response.ok) {
                dispatch({
                    type: FSS_FAILURE,
                });
                throw new Error(resData.error);
            }
            dispatch({
                shares:resData.shares,
                type: FSS_LISTSHARE,
            });
        } catch (err) {
            throw err;
        }
    };
};

export const CreateShare = (path,token) => {
    return async dispatch => {
        dispatch({
            type: FSS_LOADING,
        });
        try {
            const response = await timeoutPromise(
                fetch(`${API_URL}/fss/create_share`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        path,
                        token,
                    }),
                }),
            );
            const resData = await response.json();
            if (!response.ok) {
                dispatch({
                    type: FSS_FAILURE,
                });
                throw new Error(resData.error);
            }
            dispatch({
                type: FSS_SHARE,
            });
        } catch (err) {
            throw err;
        }
    };
};

export const DeleteShare = (sid,token) => {
    return async dispatch => {
        dispatch({
            type: FSS_LOADING,
        });
        try {
            const response = await timeoutPromise(
                fetch(`${API_URL}/fss/delete_share`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        sid,
                        token,
                    }),
                }),
            );
            const resData = await response.json();
            if (!response.ok) {
                dispatch({
                    type: FSS_FAILURE,
                });
                throw new Error(resData.error);
            }
            dispatch({
                type: FSS_SHARE,
            });
        } catch (err) {
            throw err;
        }
    };
};

export const DeleteFile = (path,name,token) => {
    return async dispatch => {
        dispatch({
            type: FSS_LOADING,
        });
        try {
            const response = await timeoutPromise(
                fetch(`${API_URL}/fss/delete_file`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        path,
                        name,
                        token,
                    }),
                }),
            );
            const resData = await response.json();
            if (!response.ok) {
                dispatch({
                    type: FSS_FAILURE,
                });
                throw new Error(resData.error);
            }
            dispatch({
                type: FSS_DELETEFILE,
            });
        } catch (err) {
            throw err;
        }
    };
};

export const UploadFile = (path,file,token) => {
    return async dispatch => {
        dispatch({
            type: FSS_LOADING,
        });
        const convertBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file)
                fileReader.onload = () => {
                    resolve(fileReader.result);
                }
                fileReader.onerror = (error) => {
                    reject(error);
                }
            })
        }
        try {
            const response = await timeoutPromise(
                fetch(`${API_URL}/fss/upload_file`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        path,
                        "name":file.name,
                        token,
                        "data":(await convertBase64(file)).split(';base64,')[1],
                    }),
                }),
            );
            const resData = await response.json();
            if (!response.ok) {
                dispatch({
                    type: FSS_FAILURE,
                });
                throw new Error(resData.error);
            }
            dispatch({
                type: FSS_UPLOADFILE,
            });
        } catch (err) {
            throw err;
        }
    };
};

