import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import * as XLSX from 'xlsx';
import { ToastServiceMethods } from 'primevue/toastservice';
// import { TMaintenanceStatus, TStatus, TTaskStatus } from "@/types/status.type";
// import { TSeverity } from "@/types/severity.type";

// const getName = (data: any, key: string, sequence?: boolean) => {
//   const field = sequence ? "nameWithSequence" : "name";
//   return data[key] ? (data[key][field] ? data[key][field] : "-") : "-";
// };

const formatDate = (date: any) => {
  if (date) return new Date(date).toLocaleDateString('en-gb');
  return '';
};

const formatDateTime = (date?: string | Date | null) => {
  if (date) {
    const options: Intl.DateTimeFormatOptions = {
      dateStyle: 'short',
      timeStyle: 'short',
    };

    return new Date(date).toLocaleString('en-gb', options);
  }
  return '';
};

interface IExcelOptions {
  headers: string[];
  data: object[];
  filename: string;
}
/**
 *
 * @param options
 * pastikan header dan key dari object urutannya sama
 */
const exportToExcel = async (options: IExcelOptions) => {
  const heading = [options.headers];
  const workbook = XLSX.utils.book_new();
  const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
  XLSX.utils.sheet_add_aoa(workSheet, heading);

  XLSX.utils.sheet_add_json(workSheet, options.data, {
    origin: 'A2',
    skipHeader: true,
  });
  XLSX.utils.book_append_sheet(workbook, workSheet, 'Sheet1');
  const timestamps = +new Date();
  XLSX.writeFile(workbook, `${options.filename}_${timestamps}.xlsx`);
};

const copyTextToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const filterSelectedTreeKeys = (keys: any) => {
  const formatted = Object.entries(keys);
  const filtered = formatted
    .filter((data: any) => data[1].checked && !data[1].partialChecked)
    .map((data) => parseInt(data[0]));
  return filtered;
};

const addTokenExpirationHandling = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('user');
        window.location.reload();
      }
    }
  );
};

const getFile = (fileName: string) => {
  const baseURL = process.env.VUE_APP_ASSETS_API;
  const user = JSON.parse(localStorage.getItem('user')!);
  return `${baseURL}/v2/assets/files/${user.companyCode}/${fileName}`;
};

let user: any;

const getUser = () => {
  if (!user) {
    user = JSON.parse(localStorage.getItem('user')!);
  }
  return user;
};

const getImg = (fileName?: any) => {
  const imgPlaceholder =
    'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg';
  const baseURL = process.env.VUE_APP_ASSETS_API;
  const currentUser = getUser();
  if (!fileName || !currentUser) return imgPlaceholder;
  const imagePath = `${baseURL}/v2/assets/images/${currentUser.companyCode}/${fileName}`;
  return imagePath;
};

const isRouteNoSidebar = (currentRoute: string, splittedRoute: string) => {
  const routes = {
    specific: ['assets/my', 'assets/details'],
    inherit: [],
  };
  const currentNoSidebar = routes.specific.some((route: string) => {
    return currentRoute.toLowerCase().includes(route);
  });
  const inheritNoSidebar = routes.inherit.some(
    (route: string) => splittedRoute.toLowerCase() === route.toLowerCase()
  );
  return currentNoSidebar || inheritNoSidebar;
};

const watchRoutingEvent = (
  watchFunc: (currentRoute: any, oldRoute: any) => void
) => {
  window.addEventListener('single-spa:before-routing-event', (evt: any) => {
    watchFunc(evt.detail.newUrl, evt.detail.oldUrl);
  });
};

type ToastParams = {
  toast: ToastServiceMethods;
  activity: string;
};
type ErrorToastParams = ToastParams & { error: any };

const handleError = (params: ErrorToastParams) => {
  const isNetworkError = params.error.code === 'ERR_NETWORK';
  const additionalMsg = isNetworkError
    ? ', Please check your connection again'
    : '';
  let message = `Error, failed to ${params.activity}${additionalMsg}.`;
  if (params.error.response?.status === 400) {
    message = params.error.response.data.message;
  }
  params.toast.add({
    severity: 'error',
    detail: message,
    life: 3000,
  });
};

const handleSuccess = (params: ToastParams) => {
  const message = `Success, ${params.activity}`;
  params.toast.add({
    severity: 'success',
    detail: message,
    life: 3000,
  });
};

// const getTaskStatusSeverity = (status: TTaskStatus) => {
//   let severity: TSeverity;
//   switch (status) {
//     case "Waiting for Assignment":
//     case "Waiting for Approval":
//     case "Waiting for Review":
//       severity = "warning";
//       break;
//     case "Overdue":
//       severity = "danger";
//       break;
//     default:
//       severity = "primary";
//       break;
//   }
//   return severity;
// };

// const getStatusMaintenanceSeverity = (status: TMaintenanceStatus) => {
//   let severity: TSeverity;
//   switch (status) {
//     case "Done":
//     case "Repaired":
//       severity = "success";
//       break;
//     case "Canceled":
//     case "Reported Damage":
//     case "Reported Damaged":
//     case "Permanently Damaged":
//       severity = "danger";
//       break;
//     case "Reported Disposal":
//       severity = "warning";
//       break;
//     default:
//       severity = "primary";
//       break;
//   }
//   return severity;
// };

// const getStatusSeverity = (status: TStatus) => {
//   let severity: TSeverity;
//   switch (status) {
//     case "Available":
//       severity = "success";
//       break;
//     case "Lost":
//       severity = "danger";
//       break;
//     case "Borrowed":
//     case "Assigned":
//       severity = "primary";
//       break;
//     case "Disposed":
//       severity = "dark";
//       break;
//     default:
//       severity = "primary";
//       break;
//   }
//   return severity;
// };

const formattedDowntime = (seconds: any) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours === 0) {
    return `${minutes} minute(s)`;
  } else {
    return `${hours} hour(s) ${minutes} minute(s)`;
  }
};

const formatRupiah = (number: any) => {
  const formattedNumber = number.toLocaleString('en-US');
  return `Rp ${formattedNumber}`;
};

const getResultColor = (result: any) => {
  if (
    result === 'Failed' ||
    result === 'Failed (Not Eligible)' ||
    result === 'Failed (for Expired Warranty Period)'
  ) {
    return { color: 'red' };
  } else if (
    result === 'Success' ||
    result === 'Success (for Warranty Service)' ||
    result === 'Success (for Unit Replacement)'
  ) {
    return { color: 'green' };
  }
};

export {
  getFile,
  getImg,
  filterSelectedTreeKeys,
  formatDate,
  formatDateTime,
  exportToExcel,
  copyTextToClipboard,
  addTokenExpirationHandling,
  isRouteNoSidebar,
  watchRoutingEvent,
  handleError,
  handleSuccess,
  // getTaskStatusSeverity,
  formattedDowntime,
  formatRupiah,
  getResultColor,
};
