export const EPs = {

   security: {
      login: "/security/user/login",
      user: {
         save: "/security/user/save",
         list: "/security/user/list",
         get: "/security/user/get/",
         pwd: "/security/user/password/change"
      },
      role: {
         save: "/security/user/save",
         list: "/security/role/list",
      },
      plant: {
         get: "/security/plant/get/"
      },
      parameter: {
         save: "/security/parameter/save",
         list: "/security/parameter/list",
      },
      grant: {
         save: "/security/grant/save",
         list: "/security/grant/list",
         father: "/security/grant/father/list",
         tree: "/security/grant/tree/list/",
         role: {
            list: "/security/grant/list/",
            save: "/security/grant/role/save"
         }
      }
   },
   catalog: {
      catalog: {
         save: "/catalog/catalog/save",
         list: "/catalog/catalog/list",
         get: "/catalog/catalog/get/",
         udpate: "/catalog/catalog/update",
         editedclonated: "/catalog/catalog/editedclonated",
         hasclonated: "/catalog/catalog/hasclonated",
         delete: "/catalog/catalog/delete/",
         deleteclonated: "/catalog/catalog/deleteclonated",
         listCatalog: "/catalog/catalog/listCatalog",
         estatusOpcion: "/catalog/catalog/getEstatusMaestroOpcion"
      },
      sat: {
         list: "/catalog/sat/list",
         get: "/catalog/sat/get/",
      },
      unityProduct: {
         save: "/catalog/unityProduct/save",
         list: "/catalog/unityProduct/list/"
      },
      state: {
         save: "/catalog/state/save",
         list: "/catalog/state/list/",
         all: "/catalog/state/listAll",
      },
      money: {
         save: "/catalog/money/save",
         list: "/catalog/money/list/",
         all: "/catalog/money/listAll",
      },
      status: {
         list: "/catalog/status/list/"
      },
      admin: {
         catalog: "/catalog/admin/catalogo/"
      },
      catalogOption: {
         id: "/catalog/catalogoOpcion/id/",
         catalog: {
            master: "/catalog/catalogoOpcion/catalogo/",
            update: {
               option: "/catalog/catalogoOpcion/catalogo/update/",
               estatus:"/catalog/catalogoOpcion/catalogo/update/estatus/"
            },
            delete: "/catalog/catalogoOpcion/catalogo/delete/"
         }
      }
   },
   market: {
      invoice: {
         fut: "/market/market/invoice/get/fuf/",
         save: "/market/market/invoice/save",
         fuecd: "/market/market/invoice/fuecd",
         get: "/market/market/invoice/get/",
         list: {
            all: "/market/market/invoice/list/",
         },
         download: "/market/market/invoice/download/",
      },
      product: {
         list: {
            all: "/market/market/product/list/",
            client: "/market/market/product/list/client/",
         },
         save: "/market/market/product/save",
         get: "/market/market/product/get/",
      },
      client: {
         list: {
            all: "/market/market/client/list/",
         },
         save: "/market/market/client/save",
         get: "/market/market/client/get/",
      },
      plant: {
         list: {
            all: "/market/market/plant/list/",
         },
         save: "/market/market/plant/save",
         get: "/market/market/plant/get/",
      },
      creditNote: {
         save: "/market/market/creditNote/save",
         get: "/market/market/creditNote/get/",
         list: {
            all: "/market/market/creditNote/list/",
         },
         download: "/market/market/creditNote/download/",
      },
      debitNote: {
         save: "/market/market/debitNote/save",
         get: "/market/market/debitNote/get/",
         list: {
            all: "/market/market/debitNote/list/",
         },
         download: "/market/market/debitNote/download/",
      },
      plantBranchOffice: {
         list: {
            all: "/market/market/plantBranchOffice/list/",
         },
      },
      branchOfficeInvoiceSerie: {
         save: "/market/market/branchOfficeInvoiceSerie/save",
         list: {
            all: "/market/market/branchOfficeInvoiceSerie/list/",
         }
      },
      branchOfficeCreditNoteSerie: {
         save: "/market/market/branchOfficeCreditNoteSerie/save",
         list: {
            all: "/market/market/branchOfficeCreditNoteSerie/list/",
         }
      },
      financialIndex: {
         list: {
            all: "/market/market/financialIndex/list/",
         }
      },
      inpp: {
         list: {
            all: "/market/market/inpp/list",
         }
      },
      usppi: {
         list: {
            all: "/market/market/usppi/list",
         }
      }
   },
   mastercatalog: {
      mastercatalog: {
         masters: "/mastercatalog/mastercatalog/mastercatalog/masters/2",
         opcion: "/mastercatalog/mastercatalog/mastercatalog/opciones/",
         updatemaster: "/mastercatalog/mastercatalog/mastercatalog/updatemaster",
         updateoption: "/mastercatalog/mastercatalog/mastercatalog/updateoption",
         saveMaster: "/mastercatalog/mastercatalog/mastercatalog/saveMaster",
         saveOpcion: "/mastercatalog/mastercatalog/mastercatalog/saveOpcion",
         compliance: "/mastercatalog/mastercatalog/mastercatalog/TIPO_CUMPLIMIENTO",
         unitPeriod: "/mastercatalog/mastercatalog/mastercatalog/UNIT_PERIOD",
         status: "/mastercatalog/mastercatalog/mastercatalog/",
         origin: "/mastercatalog/mastercatalog/mastercatalog/Origen",
      },
      list: {
         catalog: "/mastercatalog/mastercatalog/list/catalog"
      }
   },
   tags: {
      delete: "/tags/tags/eliminar",
      tag: "/tags/tags/",
      precedingActivity: "/tags/tags/getActividadesPrecedentes",
      precedingAdd: "/tags/tags/agregarPrecedentes",
      precedingDelete: "/tags/tags/eliminarPrecedente",
      save: "/tags/tags/guardar",
      activity: {
         alls: "/tags/tags/actividad/all/TODOS",
         all: "/tags/tags/actividad/all",
         getConsecutive: "/tags/tags/actividad/obtenerConsecutivo",
         getActivity: "/tags/tags/actividad/obtenerActividad",
         create: "/tags/tags/actividad/crear",
         edit: {
            fatherclone: "/tags/tags/actividad/edit/fatherclone",
         },
         ed: "/tags/tags/actividad/editar",
         editedclonated: "/tags/tags/actividad/editedclonated",
         delete: "/tags/tags/actividad/eliminar",
         deleteclonated: "/tags/tags/actividad/deleteclonated",
      }
   },
   exam: {
      staff: {
         competent: "/exam/exam/personalCompetente/competentes",
         employee: {
            all: "/exam/exam/personalCompetente/empleados",
            evaluation: "/exam/exam/personalCompetente/empleados/evaluaciones",
            get: "/exam/exam/personalCompetente/empleados",
         },
         employeeEvaluation: "/exam/exam/personalCompetente/empleado",
         saveSoport: "/exam/exam/personalCompetente/guardaSoporte",
         downloadFile: "/exam/exam/personalCompetente/downloadFile",
         listSoport: "/exam/exam/personalCompetente/listaSoportes",
         deleteFile: "/exam/exam/personalCompetente/deleteFile",
      },
      updateEmployee: "/exam/exam/actualizaEmpleado",
      employee: {
         id: "/exam/exam/empleado",
      },
      detailEmployee: "/exam/exam/empleadoDetalle",
      generate: "/exam/exam/genera",
      questions: "/exam/exam/preguntas",
      saveExam: "/exam/exam/guardaexamen",
      responseValue: "/exam/exam/valorRespuesta",
      save: "/exam/exam/guardarSicometricoEmpleado",
      saveEmployeePsychometric: "/exam/exam/guardarSicometricoEmpleado",
      get: {
         qualification: {
            id: "/exam/exam/obten/calificacion",
            reservation: "/exam/exam/obten/calificacion/reservacion",
            global: "/exam/exam/obten/calificacion/global",
         },
         documents: "/exam/exam/obten/documents",
         reservation: "/exam/exam/obten/reservacion",
      },
      catalog: {
         documents: "/exam/exam/obten/catalogo/documents",
      },
      completion: "/exam/exam/terminaExamen",
      observation: "/exam/exam/getObservaciones",
      saveObservation: "/exam/exam/guardaObservacion",
      deleteObservation: "/exam/exam/eliminaObservation",
      saveFile: "/exam/exam/guardarArchivos",
      deleteFile: "/exam/exam/eliminaArchivo"
   },
   configuration: {
      evaluation: "/configuration/configEva/evalucionConfiguracion/get"
   },
   tracing: {
      legal: {
         get: {
            matriz: "/seguimiento/legal/obten/matriz",
            complianceActivity: "/seguimiento/legal/obten/complianceActividad",
            complianceById: "/seguimiento/legal/obten/complianceById",
            listMatriz: "/seguimiento/legal/obten/list/matriz",
            diagram: "/seguimiento/legal/obten/obtenDiagramas",
            observation: "/seguimiento/legal/obten/observaciones",
            documents: "/seguimiento/legal/obten/documents",
            gantt: "/seguimiento/legal/obten/gantt",
         },
         staff: {
            tag: {
               assigned: "/seguimiento/legal/personalCompetente/tags/ASIGNACION"
            }
         },
         tag: {
            employees: "/seguimiento/legal/tags/empleados",
            actorProfile: "/seguimiento/legal/tags/perfilActor"
         },
         approve: {
            matriz: "/seguimiento/legal/aprobar/matriz",
         },
         release: {
            matriz: "/seguimiento/legal/libera/matriz",
            compliance: "/seguimiento/legal/libera/compliance",
         },
         generation: {
            list: {
               task: "/seguimiento/legal/generation/list/task",
            }
         },
         update: {
            compliance: "/seguimiento/legal/update/compliance",
         },
         save: {
            observation: "/seguimiento/legal/guarda/observacion",
         },
         accept: {
            responsible: {
               compliance: "/seguimiento/legal/accept/responsible/compliance"
            }
         },
         saveFile: "/seguimiento/legal/guardarArchivos"
      },
      activity: {
         get: "/seguimiento/actividad/obtenerActividad"
      }
   },
   statusMaster: {
      status: "/estatusmaestro/status/",
      get: {
         catalog: "/estatusmaestro/status/obten/catalogo/",
      }
   },
   fuecd: {
      save: "/fuecd/fuecd/save",
      status: {
         invoice: "/fuecd/fuecd/estatus/facturado/",
      },
      changeStatus: "/fuecd/fuecd/changeStatus",
      list: {
         fuf: "/fuecd/fuecd/list/fuf/",
         fuecd: "/fuecd/fuecd/list/fuecd/",
      },
      get: "/fuecd/fuecd/get/",
      account: {
         key: "/fuecd/fuecd/account/keys",
      },
      validate: "/fuecd/fuecd/validate"
   },
   weather: {
      getWeatherTypeFromTo: "/weather/getWeatherTypeFromTo",
      henryhub: {
         id: "/weather/henryhub",
         getDataFromTo: "/weather/henryhub/getDataFromTo",
      },
      temperature: {
         list: "/weather/temperature/list/"
      },
      change: {
         download: "/weather/charge/download/",
         list: "/weather/charge/list/",
         edit: "/weather/charge/edit",
         config: "/weather/charge/config/",
      },
      import: {
         validate: "/weather/import/validate",
         save: "/weather/import/save",
      },
      download: "/weather/download/",
      list: "/weather/list/",
      edit: "/weather/edit",
      energy: {
         download: "/weather/energy/download/",
         list: "/weather/energy/list/",
         edit: "/weather/energy/edit",
      },
      config: "/weather/config/",
   },
   ftpconsumer: {
      configuration: {
         all: "/ftpconsumer/ftpconsume/configuration/getAll",
         get: "/ftpconsumer/ftpconsume/configuration/get/",
         save: "/ftpconsumer/ftpconsume/configuration/save",
      },
      monitoring: {
         all: "/ftpconsumer/ftpconsume/monitoring/getAll/",
         detail: {
            get: "/ftpconsumer/ftpconsume/monitoring/detail/get/",
         }
      },
      executeProcess: {
         month: "/ftpconsumer/ftpconsume/executeProcess/month/",
         id: "/ftpconsumer/ftpconsume/executeProcess/",
      }
   },
   pml: {
      list:  "/pml/list/",
   },
   tr: {
      weather: {
         list: "/tr/weather/list/",
      },
      forecast: {
         list: "/tr/forecast/list/",
      },
      hourly: {
         list: "/tr/hourly/list/",
      },
   },
   mmmarket: {
      prediction: {
         planning: "/mmmercado/mmmercado/prediction/planning/",
         updaterow: "/mmmercado/mmmercado/prediction/updaterow",
      },
      validate: {
         id: "/mmmercado/mmmercado/validate",
         mtr: {
            cenace: "/mmmercado/mmmercado/validate/mtr/cenace",
         },
         MTR: "/mmmercado/mmmercado/validate/MTR"
      },
      planning: {
         mtr: {
            id: "/mmmercado/mmmercado/planning/mtr/",
            cenace: {
               id: "/mmmercado/mmmercado/planning/mtr/cenace",
               apply: {
                  activate: "/mmmercado/mmmercado/planning/mtr/cenace/solicita/activar",
               },
               activate: "/mmmercado/mmmercado/planning/mtr/cenace/activar/",
               comments: "/mmmercado/mmmercado/planning/mtr/cenace/comentarios/",
            },
            accept: "/mmmercado/mmmercado/planning/mtr/accept/",
            completion: "/mmmercado/mmmercado/planning/termina/",
            apply: {
               activate: "/mmmercado/mmmercado/planning/mtr/solicita/activar",
            },
            activate: "/mmmercado/mmmercado/planning/mtr/activar/",
            comments: "/mmmercado/mmmercado/planning/mtr/comentarios/",
         },
         apply: {
            activate: "/mmmercado/mmmercado/planning/solicita/activar",
         },
         cenace: "/mmmercado/mmmercado/planning/cenace/",
         accept: "/mmmercado/mmmercado/planning/accept/",
         completion: "/mmmercado/mmmercado/planning/termina/",
         activate: "/mmmercado/mmmercado/planning/activar",
         comments: "/mmmercado/mmmercado/planning/comentarios/",
      },
      resulted: {
         planning: "/mmmercado/mmmercado/resulted/planning/",
      },
      download: {
         id: "/mmmercado/mmmercado/download/",
         mtr: "/mmmercado/mmmercado/download/mtr/",
      }
   },
   microuploaddb: {
      downloadFile: "/microuploaddb/downloadFile/",
   },
   pi: {
      piwebapi: {
         streamsets: {
            interpolated: "/pi/piwebapi/streamsets/interpolated"
         }
      }
   },
   ef: {
      configuration: {
         event: {
            list: "/efh/configuration/event/list",
            listByDate: "/efh/configuration/event/listByDate",
            listAsc: "/efh/configuration/event/listAsc",
            get: "/efh/configuration/event/get/",
            save: "/efh/configuration/event/save",
            delete: "/efh/configuration/event/delete/",
            listObservation: "/efh/configuration/event/listObservations/",
            saveObservation: "/efh/configuration/event/saveObservation/",
            deleteObservation: "/efh/configuration/event/deleteObservation/",
            saveFile: "/efh/configuration/event/saveFile",
            downloadFile: "/efh/configuration/event/downloadFile/",
            listFiles: "/efh/configuration/event/listFiles/",
            deleteFile: "/efh/configuration/event/deleteFile/",
         },
         indicator: {
            list: "/efh/configuration/indicator/list",
            listByDate: "/efh/configuration/indicator/listByDate",
            get: "/efh/configuration/indicator/get/",
            save: "/efh/configuration/indicator/save",
            delete: "/efh/configuration/indicator/delete/",
            listObservation: "/efh/configuration/indicator/listObservations/",
            saveObservation: "/efh/configuration/indicator/saveObservation/",
            deleteObservation: "/efh/configuration/indicator/deleteObservation/",
            saveFile: "/efh/configuration/indicator/saveFile",
            downloadFile: "/efh/configuration/indicator/downloadFile/",
            listFiles: "/efh/configuration/indicator/listFiles/",
            deleteFile: "/efh/configuration/indicator/deleteFile/",
         }
      },
      operating: {
         data: {
            get: "/efh/operating/data/get"
         }
      }
   },
   dgctags: {
      obtenTag: {
         get: "/dgctags/dgctags/obtenTag/",
         stage: "/dgctags/dgctags/obtenTag/etapa/",
      }
   },
   dycformato: {
      upload: {
         zip: "/dycformato/dycformato/upload/zip/",
      },
      uploadPerfil: "/dycformato/dycformato/uploadPerfil/",
      profile: {
         corrected: "/dycformato/dycformato/profile/corrected/",
         detected: "/dycformato/dycformato/profile/detected/",
         norm: {
            corrected: "/dycformato/dycformato/profile/norm/corrected/",
            detected: "/dycformato/dycformato/profile/norm/detected/",
         }
      },
      loadRaw: {
         bitacora: "/dycformato/dycformato/loadRaw/bitacora",
         correction: "/dycformato/dycformato/loadRaw/correccion/",
         detection: "/dycformato/dycformato/loadRaw/deteccion/",
         stagenorm: "/dycformato/dycformato/loadRaw/stagenorm/",
         stage: "/dycformato/dycformato/loadRaw/stage/",
         stageload: "/dycformato/dycformato/loadRaw/stageload/",
      },
      norm: {
         correction: "/dycformato/dycformato/norma/correccion/",
         detection: "/dycformato/dycformato/norma/deteccion/"
      },
      download: {
         id: "/dycformato/dycformato/download/",
         report: {
            raw: "/dycformato/dycformato/download/reporte/crudos/",
         },
         profile: {
            raw: "/dycformato/dycformato/download/profile/crudos/",
         },
         zip: "/dycformato/dycformato/download/zip/",
      },
      mmmppa: {
         calcFactor: "/dycformato/dycformato/mmmppa/calculaFactores/"
      }
   },
   binnacle: {
      save: {
         binnacle: {
            id: "/binnacle/binnacle/save/binnacle",
            configuration: "/binnacle/binnacle/save/binnacle/configuration",
         },
         splice: "/binnacle/binnacle/save/splice",
      },
      update: {
         binnacle: {
            configuration: "/binnacle/binnacle/update/binnacle/configuration",
         },
         note: "/binnacle/binnacle/update/note",
      },
      download: {
         id: "/binnacle/binnacle/download/",
         binnacle: {
            real: "/binnacle/binnacle/download/binnacle/real/",
         },
         search: {
            filter: {
               events: "/binnacle/binnacle/download/search/filter/events/",
            }
         },
         zip: {
            cenance: "/binnacle/binnacle/download/zip/cenance/",
         }
      },
      configuration: {
         list: "/binnacle/binnacle/configuration/list",
      },
      template: "/binnacle/binnacle/template/",
      event: {
         between: "/binnacle/binnacle/events/between/",
         delete: "/binnacle/binnacle/events/delete",
      },
      search: {
         filter: {
            events: "/binnacle/binnacle/search/filter/events/",
         },
         events: "/binnacle/binnacle/search/events/",
      },
      change: {
         status: "/binnacle/binnacle/change/status",
      },
      delete: {
         id: "/binnacle/binnacle/delete/",
         bearer: "/binnacle/binnacle/delete/bearer",
         note: "/binnacle/binnacle/delete/note",
         splice: "/binnacle/binnacle/delete/splice",
      },
      configure: {
         associated: "/binnacle/binnacle/configure/associated",
      },
      get: {
         splice: "/binnacle/binnacle/obten/splices/",
         support: "/binnacle/binnacle/obten/support/",
      },
      upload: {
         zip: "/binnacle/binnacle/upload/zip/",
      }
   },
   economicproposal: {
      id: "/economicproposal/economicproposal/",
      save: "/economicproposal/economicproposal/save",
   },
   fuelcost: {
      save: {
         masterFuelCost: "/fuelcost/fuelcost/save/masterFuelCost",
      },
      delete: {
         fuelCost: "/fuelcost/fuelcost/delete/fuelCost",
         bearer: "/fuelcost/fuelcost/delete/bearer",
      },
      finalized: "/fuelcost/fuelcost/finalized",
      find: "/fuelcost/fuelcost/find",
      get: {
         support: "/fuelcost/fuelcost/obten/support",
      },
      upload: {
         support: "/fuelcost/fuelcost/upload/support",
      }
   },
   clientexternalapis: {
      fileCenter: "/clientexternalapis/file-center",
      usppi: {
         id: "/clientexternalapis/usppi",
         dateOpBetween: "/clientexternalapis/usppi/date-op-between/",
      },
      salaryIncrease: {
         id: "/clientexternalapis/salary-increase",
         dateOpBetween: "/clientexternalapis/salary-increase/date-op-between"
      },
      watercost: {
         id: "/clientexternalapis/watercost",
         dateOpBetween: "/clientexternalapis/watercost/date-op-between"
      },
      inpp: {
         id: "/clientexternalapis/inpp",
         dateOpBetween: "/clientexternalapis/inpp/date-op-between"
      },
      tc: {
         id: "/clientexternalapis/tc",
         dateOpBetween: "/clientexternalapis/tc/date-op-between"
      }
   },
   incident: {
      list: "/incidents/incidents/list/",
      delete: "/incidents/incidents/delete",
      save: "/incidents/incidents/save",
      saveObservation: "/incidents/incidents/saveObservation",
      listObservation: "/incidents/incidents/listObservations",
      deleteObservation: "/incidents/incidents/deleteObservation",
      saveFile: "/incidents/incidents/saveFile",
      listFile: "/incidents/incidents/listFiles",
      deleteFile: "/incidents/incidents/deleteFile",
      downloadFile: "/incidents/incidents/downloadFile",
   }
};
