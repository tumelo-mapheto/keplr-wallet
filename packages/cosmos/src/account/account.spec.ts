import { BaseAccount } from "./index";

describe("Test account parse", () => {
  test("Test fromAminoJSON", () => {
    // Base account
    let account = BaseAccount.fromProtoJSON({
      account: {
        "@type": "/cosmos.auth.v1beta1.BaseAccount",
        address: "cosmos1vv6hruquzpty4xpks9znkw8gys5x4nsnqw9f4k",
        pub_key: {
          "@type": "/cosmos.crypto.secp256k1.PubKey",
          key: "Avn3xBbmE0+MEyWMuxhmjjiX1GtCUVyv/Mavg8OcRIm4",
        },
        account_number: "9736",
        sequence: "1019",
      },
    });

    expect(account.getAddress()).toBe(
      "cosmos1vv6hruquzpty4xpks9znkw8gys5x4nsnqw9f4k"
    );
    expect(account.getSequence().toString()).toBe("1019");
    expect(account.getAccountNumber().toString()).toBe("9736");
    expect(account.getType()).toBe("/cosmos.auth.v1beta1.BaseAccount");

    // Vesting account
    account = BaseAccount.fromProtoJSON({
      account: {
        "@type": "/cosmos.vesting.v1beta1.DelayedVestingAccount",
        base_vesting_account: {
          base_account: {
            address: "cosmos1x3rhderemr703f4lxktk2da99vl5crs28ur3xl",
            pub_key: {
              "@type": "/cosmos.crypto.secp256k1.PubKey",
              key: "A+Zzm/8QhyL00ISXgiAgeW6zeqZHezVFi2w3iQkJeKyP",
            },
            account_number: "367245",
            sequence: "30",
          },
          original_vesting: [
            {
              denom: "uatom",
              amount: "16666660000",
            },
          ],
          delegated_free: [
            {
              denom: "uatom",
              amount: "11620069",
            },
          ],
          delegated_vesting: [
            {
              denom: "uatom",
              amount: "16666660000",
            },
          ],
          end_time: "1719752607",
        },
      },
    });

    expect(account.getAddress()).toBe(
      "cosmos1x3rhderemr703f4lxktk2da99vl5crs28ur3xl"
    );
    expect(account.getSequence().toString()).toBe("30");
    expect(account.getAccountNumber().toString()).toBe("367245");
    expect(account.getType()).toBe(
      "/cosmos.vesting.v1beta1.DelayedVestingAccount"
    );

    // Custom account that embeds the base account (ethermint)
    account = BaseAccount.fromProtoJSON({
      account: {
        "@type": "/ethermint.types.v1.EthAccount",
        base_account: {
          address: "evmos1w3ygakvq5snf30pca5g8pnyvvfr7x28djnj34m",
          pub_key: {
            "@type": "/ethermint.crypto.v1.ethsecp256k1.PubKey",
            key: "AulWtcPTIZWd/CnkFkQOMqDOwU7e+U/Iq8Tli1nhBq6j",
          },
          account_number: "11",
          sequence: "1",
        },
      },
    });

    expect(account.getAddress()).toBe(
      "evmos1w3ygakvq5snf30pca5g8pnyvvfr7x28djnj34m"
    );
    expect(account.getSequence().toString()).toBe("1");
    expect(account.getAccountNumber().toString()).toBe("11");
    expect(account.getType()).toBe("/ethermint.types.v1.EthAccount");
  });
});
