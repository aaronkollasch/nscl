


var ContextStore = (() => {
  'use strict';

  class ContextStore {

    constructor(contextStoreData) {
      this.policies = ({});
      if (contextStoreData && contextStoreData.policies) {
        for (const [cookieStoreId, policy] of Object.entries(contextStoreData.policies)) {
          this.policies[cookieStoreId] = new Policy(policy);
        }
      }
    }

    static hydrate(dry, contextObj) {
//       debug("HYDRATE", contextObj);
      let newPolicies = new Object();
      for (const [cookieStoreId, policy] of Object.entries(dry.policies)) {
        newPolicies[cookieStoreId] = new Policy(contextObj.policies[cookieStoreId]);
//         debug("HYDRATED-PART", cookieStoreId, policy, newPolicies[cookieStoreId]);
      }
      newContextStore = contextObj ? Object.assign(ContextStore, ({policies: newPolicies}))
        : new ContextStore({policies: newPolicies});
//       debug("HYDRATED", newPolicies, newContextStore);
      return newContextStore();
    }

    dry(includeTemp = false) {
      var policies = Object.assign({}, this.policies);
//       debug("DRY", this);
      for (const [cookieStoreId, policy] of Object.entries(policies)) {
        policies[cookieStoreId] = policy.dry(includeTemp);
//         debug("DRIED-PART", cookieStoreId, policy, policies[cookieStoreId]);
      }
//       debug("DRIED", ({policies}));
      return ({policies});
    }

    setAll(key, value) {
      for (const [cookieStoreId, policy] of Object.entries(this.policies)) {
        policy[key] = value;
      }
    }

    get snapshot() {
      return JSON.stringify(this.dry(true));
    }

    equals(other) {
      this.snapshot === other.snapshot;
    }

    async updateContainers() {
      var identities = await browser.contextualIdentities.query({});
      if (!identities) return;
      identities.forEach(({cookieStoreId}) => {
        if (!this.policies.hasOwnProperty(cookieStoreId)) {
          this.policies[cookieStoreId] = new Policy();
        }
      })
    }
  }

  return ContextStore;
})();

