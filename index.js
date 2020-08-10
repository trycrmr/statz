class ProcessContainer {
  constructor(process) {
    this.process = process
    this.startTime = process.hrtime()
    this.isLive = true
  }

  watch = (ms = 1000) => { 
    if(this.isLive) {
      console.log(`~${Math.round(this.process.memoryUsage().heapUsed / 1024 * 100) / 100} KBs used thus far...`)
      setTimeout(() => { this.watch(ms) }, ms)
    }

  }

  exit = () => {
    console.log(`
Process ${this.process.pid} ... 
took ${this.process.hrtime(this.startTime).reduce((prev, curr, currIdx, arr) => { return currIdx === 0 ? curr : prev + curr / 1e9 }, 0) } seconds ...
and used ~${Math.round(this.process.memoryUsage().heapUsed / 1024 / 1000)} MBs or ${Math.round(this.process.memoryUsage().heapUsed / 1024 * 100) / 100} KBs
    `)
    this.isLive = false
    this.process.exit
  }
}

// const printStats = (thisProcess) => {
//   let details = `
//   Approximate memory stats:

//   ` 
//   for (let [key, value] of Object.entries(thisProcess.memoryUsage())) {
//     let thisDetail = key == 'rss' ? `${Math.round(value / 1000 / 1000 * 100) / 100} MBs | ${Math.round(value / 1000)} KBs 
//     (Resident Set Size, is the amount of space occupied in the main memory device (that is a subset of the total allocated memory) for the process, which includes the heap, code segment and stack.)
//     ` 
//     : key == 'heapTotal' ? `${Math.round(value / 1000 / 1000 * 100) / 100} MBs | ${Math.round(value / 1000)} KBs 
//     (heapTotal refers to V8's memory usage.)
//     `
//     : key == 'heapUsed' ? `${Math.round(value / 1000 / 1000 * 100) / 100} MBs | ${Math.round(value / 1000)} KBs 
//     (heapUsed refers to V8's memory usage.)
//     `
//     : key == 'external' ? `${Math.round(value / 1000 / 1000 * 100) / 100} MBs | ${Math.round(value / 1000)} KBs 
//     (external refers to the memory usage of C++ objects bound to JavaScript objects managed by V8. )
//     `
//     : undefined

//     details += thisDetail + `
//   `
//   }
//   return details
// }

export default ProcessContainer