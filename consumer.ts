import {createReader} from "./src";

const reader = createReader({workerQueue:'worker-1'});
reader.getMessage();

