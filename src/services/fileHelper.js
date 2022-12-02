import axios from "axios";
import { CLOUDINARY_UPLOAD_API_URL} from './common';

const Unsigned_Uploading = "mkm2eadx";
class FileHelper {
    static uploadImage(imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", Unsigned_Uploading);
        return axios.post(CLOUDINARY_UPLOAD_API_URL, formData);
    }
}

export default FileHelper;