<template>
  <DocHeader>
    Insulated from the Collapse of Fiat
  </DocHeader>
  <DocContent>
    <div class="font-extralight italic text-3xl leading-10 my-6">
      A well-designed currency should be able to outlast
      any single nation state, banking institution, or other fallible entity.
    </div>
    <p>
      For thousands of years, the world has used gold. Gold has largely been indifferent to geographical and
      geopolitical catastrophe, and it doesn't care which government is in power. If your coins were
      stamped with the old regime, you could melt them down and stamp them with the new regime. In short, gold has
      always outlasted the governments whose names were stamped on its coins.
    </p>

    <p>
      Gold’s durability came with a practical limitation: it was difficult and expensive to move across long distances.
      Paper claims on gold allowed people to exchange value without moving the metal itself. As governments later
      ended gold convertibility, those currencies became fiat.<sup class="fiat-money-note-ref"><a href="#fiat-money-note-1" aria-label="See note 1 on the transition from gold to fiat">[1]</a></sup>
    </p>

    <p>
      This left the currency’s value dependent on confidence in the institutions issuing and managing it. The issuing
      government’s credibility and financial health became part of the currency’s foundation. When that foundation
      fails, the currency fails with it.
    </p>

    <p>
      Those institutions face risks that their currencies inherit: war, unsustainable spending, natural disasters,
      or a loss of political legitimacy.
    </p>

    <p>
      Fiat-backed stablecoins add further institutional dependencies. The dollar depends on U.S. monetary institutions.
      However, a stablecoin, such as USDC, requires three layers of support: the fiat it's pegged to, the company issuing
      the token, and the custodians holding the assets behind it. If any one of these three layers is disrupted,
      the stablecoin's value or redeemability can be threatened.
    </p>

    <div class="flex flex-row space-x-10 mt-10 mb-3">
      <section box class="border-6 border-red-600 bg-white shadow text-center">
        <h3 class="text-2xl font-bold py-3">Fiat Currencies</h3>
        <emphasis class="block border-t border-b border-gray-200 mx-5 py-2 text-lg italic text-red-600 font-bold">Depends on Monetary Institutions</emphasis>
        <div class="py-5 px-[10%]">Value depends on confidence in the institutions that issue and manage the currency.</div>
      </section>
      <section box class="border-6 border-red-600 bg-white shadow text-center">
        <h3 class="text-2xl font-bold py-3">Fiat-Backed Stablecoins</h3>
        <emphasis class="block border-t border-b border-gray-200 mx-5 py-2 text-lg italic text-red-600 font-bold">Adds Issuer and Custodian Risk</emphasis>
        <div class="py-5 px-[10%]">Value depends on the underlying fiat, the token issuer, and the institutions holding its reserves.</div>
      </section>
    </div>

    <div class="relative mb-10 z-[-1]">
      <WorldMap style="width: 100%;" />
      <section box class="absolute bottom-0 left-0 right-0 border-6 border-lime-600 bg-white shadow text-center">
        <h3 class="text-2xl font-bold py-3">Gold, Bitcoin, & Argon</h3>
        <emphasis class="block border-t border-b border-gray-200 mx-5 py-2 text-lg italic text-lime-600 font-bold">Zero Dependencies</emphasis>
        <div class="py-5">Gold and Bitcoin have no central issuer. Neither does Argon.</div>
      </section>
    </div>

    <p>
      Gold and Bitcoin can continue to exist and be exchanged without a bank or government guaranteeing redemption.
      Argon applies the same principle to its monetary design, using Bitcoin and a distributed network of participants
      to support stabilization.
    </p>

    <p>
      To use crypto terminology, Argon aims to carry decentralization through every layer that supports its value.
      Argon’s entire value stack—from top to bottom—is built to operate across borders and outlast individual governments,
      banks, and companies.
    </p>

    <h3 class="text-2xl font-bold mt-14">
      It's Not Doom But Indifference That Matters
    </h3>

    <p>
      To be clear, the monetary principle of Indifference isn't driven by a belief that catastrophe is coming.
      Instead, it asks whether a currency can keep functioning across a wide range of possible futures. Like gold,
      the ideal currency should be able to outlast the institutions around it. You should be able to convert goods
      and services into a currency whose durability does not rest on the continued success of any single organization.
    </p>

    <p>
      The following tables examine each currency layer by layer, asking where institutional failures can interrupt
      its operation and where other participants can continue the work.
    </p>

    <h3 class="text-2xl font-bold mt-14">
      Dissecting The Bitcoin Stack<sup class="fiat-money-note-ref"><a href="#fiat-money-note-2" aria-label="See note 2 on Bitcoin consensus and mining">[2]</a></sup>
    </h3>
    <p>
      Many crypto projects market themselves as decentralized. Bitcoin is one of the few that truly is, and for this reason, it
      is the store-of-value behind Argon.
    </p>

    <table class="mt-10">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Layer</th>
        <th scope="col">Resilience</th>
        <th scope="col">Explanation</th>
      </tr>
      </thead>
      <tbody>
      <tr success>
        <td number>
          <div wrapper>
            1
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Usage</div>
            <div>
              <BitcoinIcon class="w-10 h-10 inline-block" />
              =
              <ShoppingIcon class="w-10 h-10 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized Yes>
          <div wrapper>
            Yes
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td description>
          <div wrapper>
            Thousands of exchanges, wallets, merchants, and individuals transact in Bitcoin across every continent. Usage is
            spread across countless independent actors, and using Bitcoin directly requires no central authorization. No single platform, company, or country
            can shut down global payments.  Although it's possible to imagine a world
            where governments make using bitcoin difficult, it's hard to imagine a world where using it
            becomes impossible. Even if entire regions go offline, Bitcoin transactions continue elsewhere.
            This naturally leads into the question of how Bitcoin's value is set across so many participants.
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr success>
        <td number>
          <div wrapper>
            2
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Valuation</div>
            <div>
              <PriceIcon class="w-14 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized Yes>
          <div wrapper>
            Yes
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td description>
          <div wrapper>
            Bitcoin has no single “valuation authority.” Price discovery happens simultaneously across many venues worldwide
            (spot exchanges, OTC desks, P2P markets, derivatives). Multiple venues prevent a single point of failure. If one
            market collapses or is manipulated, others remain to anchor price. If a top exchange is compromised or a country bans
            trading, global price discovery continues elsewhere. However, one of the key
            determining factors of Bitcoin's price is the amount of new bitcoin that can be mined, which is determined by
            its algorithm, not a centralized group of bankers.
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr success>
        <td number>
          <div wrapper>
            3
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Algorithm</div>
            <div>
              <CodeIcon class="w-10 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized Yes>
          <div wrapper>
            Yes
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td description>
          <div wrapper>
            Bitcoin's consensus rules cap the number of tokens to be created at 21 million. These rules are expressed in
            open-source software that anyone can implement. If a maintainer or organization stops working on the software,
            other developers can continue its development. The protocol's rules remain publicly available for anyone to
            inspect and enforce. Miners and other full-node operators choose which software to run. Each full node
            independently validates transactions and blocks against those rules.
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr success>
        <td number><div wrapper>4</div></td>
        <td component>
          <div wrapper>
            <div label>Mining</div>
            <div>
              <MinerIcon class="w-16 inline-block" />
            </div>
          </div>
        </td>
        <td centralized Yes>
          <div wrapper>
            Yes
          </div>
        </td>
        <td description>
          <div wrapper>
            Anyone with hardware and electricity can join Bitcoin as a miner. Operators are free to choose which
            implementation of the rules they will run, creating alignment between code and consensus. Mining is
            distributed across independent operators in multiple jurisdictions, with diverse energy sources and equipment.
            If miners in one country are shut down, the hashrate drops temporarily but the network continues. Difficulty
            periodically adjusts to the remaining mining power, helping restore the network's target pace of block production.
            Mining remains open to new participants, allowing operators in other jurisdictions to replace capacity lost elsewhere.
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <p>
      Bitcoin's resilience comes from redundancy at every layer. Each layer is populated by many
      independent players. Redundancy across jurisdictions and organizations eliminates single points of failure. Localized
      collapse might degrade convenience, but it can't destroy the currency's existence.
    </p>

    <h3 class="text-2xl font-bold mt-14">
      Dissecting The U.S. Dollar Stack<sup class="fiat-money-note-ref"><a href="#fiat-money-note-3" aria-label="See note 3 on U.S. monetary institutions">[3]</a></sup>
    </h3>

    <p>
      Most of us have grown up with the U.S. dollar as the world's reserve currency. We've never known another
      world, so its dominance feels permanent. We rarely think about the risk of its collapse, but it exists.
    </p>

    <table class="mt-10">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Layer</th>
        <th scope="col">Resilience</th>
        <th scope="col">Explanation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td number>
          <div wrapper>
            1
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Usage</div>
            <div>
              <DollarIcon class="h-8 inline-block" />
              <span class="font-bold pl-1"> =</span>
              <ShoppingIcon class="h-10 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized>
          <div wrapper>
            Partial
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td description>
          <div wrapper>
            The U.S. dollar's usage is widely distributed. Millions of businesses and individuals transact with it
            every day, alongside banks, payment networks and governments. Cash passes directly between users, while
            bank transfers and digital payments depend on regulated intermediaries. This broad circulation rests on
            confidence in the currency. How is the dollar's value determined and maintained?
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr failure>
        <td number>
          <div wrapper>
            2
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Valuation</div>
            <div>
              <PriceIcon class="w-14 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized No>
          <div wrapper>
            No
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td description>
          <div wrapper>
            The value of the dollar is shaped by supply and demand and supported by its role as the global reserve
            currency. That demand rests in part on confidence in the U.S. economy, the U.S. government and its
            banking system. Confidence in these institutions is critical &ndash; a collapse in that confidence puts
            dollar holders at risk everywhere. This risk is tied to the actions of the Federal Reserve.
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr failure>
        <td number>
          <div wrapper>
            3
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Federal Reserve</div>
            <div>
              <FedIcon class="w-12 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized No>
          <div wrapper>
            No
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td description>
          <div wrapper>
            The Federal Reserve is the central bank of the United States, with a federal governing board and 12
            regional Reserve Banks. It does not directly print physical dollars &ndash; that function belongs to the
            U.S. Treasury &ndash; but it sets monetary policy and manages bank reserves and the banking system's
            liquidity. Its decisions on interest rates, balance sheet operations, and financial stability shape the
            dollar's future. Because the regional Reserve Banks operate within one central banking system, the
            dollar depends on the continued operation and credibility of this institution. Its policies interact
            closely with those of the broader government, which also enforces demand for the dollar.
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr failure>
        <td number>
          <div wrapper>
            4
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Government</div>
            <div>
              <CongressIcon class="w-14 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized No>
          <div wrapper>
            No
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td description>
          <div wrapper>
            The U.S. government enforces the dollar's role as the unit of account for taxes and legal tender for
            debts. Federal tax obligations are denominated in dollars, creating recurring demand for the currency.
            Internationally, U.S. leadership in creating the Bretton Woods system placed the dollar at the center of
            postwar finance, reinforcing its global use. Congressional fiscal policy &ndash; through spending, debt
            issuance, and deficits &ndash; also directly affects the currency's stability. If the government loses
            the ability to govern and sustain its finances, the dollar loses the institutional foundation that
            supports it. This political and economic foundation is then backed by U.S. military strength.
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr failure>
        <td number><div wrapper>5</div></td>
        <td component>
          <div wrapper>
            <div label>Military</div>
            <div>
              <MilitaryIcon class="w-16 inline-block" />
            </div>
          </div>
        </td>
        <td centralized No>
          <div wrapper>
            No
          </div>
        </td>
        <td description>
          <div wrapper>
            The U.S. military supports the geopolitical influence and security alliances that reinforce the dollar's
            international role. A major defeat, such as losing a war to a rival like China, could diminish U.S.
            influence and erode confidence in the dollar's supremacy. If U.S. military power were to significantly
            decline, one of the foundations of the dollar's international influence would weaken. This reliance on
            national power ties the dollar to geopolitical outcomes that its users cannot control.
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <p>
      The dollar is highly resilient to localized failures, but it is not immune to systemic collapse. Its deeper
      layers converge on a small set of national institutions: one central bank, one federal government, and one
      military. This concentration creates single points of failure. Millions of users around the world still depend
      on that same institutional foundation.
    </p>

    <h3 class="text-2xl font-bold mt-14">
      Dissecting The USDC Stack<sup class="fiat-money-note-ref"><a href="#fiat-money-note-4" aria-label="See note 4 on USDC reserves and redemption">[4]</a></sup>
    </h3>

    <p>
      Fiat-backed stablecoins, such as USDC, create a fundamental risk/reward tension. They inherit the dollar's
      purchasing-power risk while adding dependence on an issuer, banks, and custodians. However, USDC itself pays
      no interest, and its target remains one dollar per token.
    </p>

    <table class="mt-10">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Layer</th>
        <th scope="col">Resilience</th>
        <th scope="col">Explanation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td number>
          <div wrapper>
            1
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Usage</div>
            <div>
              <USDCIcon class="h-12 inline-block" />
              <span class="font-bold pl-1"> =</span>
              <ShoppingIcon class="h-10 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized>
          <div wrapper>
            Partial
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td description>
          <div wrapper>
            USDC is widely used on cryptocurrency exchanges and DeFi applications. Users transfer it between wallets
            on public blockchains, while Circle retains the power to block transfers involving specific addresses.
            Its usefulness also rests on confidence in its dollar peg. How is USDC's value determined and
            maintained?
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr failure>
        <td number>
          <div wrapper>2
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Valuation</div>
            <div>
              <PriceIcon class="w-14 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized No>
          <div wrapper>No
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td description>
          <div wrapper>
            USDC is pegged 1:1 to the U.S. dollar. Its market price depends on confidence that its reserves and
            redemption process will deliver one dollar per token. If the market loses confidence in being able to
            exchange it for a dollar, USDC can trade below its peg. Even when the peg holds, USDC inherits any loss
            in the dollar's purchasing power. This dependence points directly to its issuer, Circle.
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr failure>
        <td number>
          <div wrapper>3
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Circle</div>
            <div>
              <CircleLogo class="w-12 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized No>
          <div wrapper>No
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td description>
          <div wrapper>
            Circle, USDC's issuer, oversees the reserves that back USDC. It is responsible for safeguarding and
            investing the assets that support each token's value. Because holders depend on Circle to issue and
            redeem USDC, a serious failure at the company &ndash; whether from mismanagement, insider fraud, or
            regulatory action &ndash; directly threatens USDC's redemption process and credibility. Those reserves
            are, in turn, held separately from Circle's operating funds through banks, custodians, and investment
            managers. If any of these institutions collapse or withdraw support, redemptions depend on Circle
            recovering access or arranging alternatives.
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr failure>
        <td number>
          <div wrapper>4
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Banks / Custodians</div>
            <div>
              <FedIcon class="w-14 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized No>
          <div wrapper>
            No
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td description>
          <div wrapper>
            <span>The backing for USDC includes bank deposits, short-term U.S. Treasuries, and Treasury-backed repurchase
            agreements held through financial institutions. Those reserves depend on the legal and operational
            systems of banks, custodians, and asset managers. In March 2023, USDC lost its peg after Circle
            disclosed that $3.3 billion of its reserves were held at the failed Silicon Valley Bank. The peg
            recovered after U.S. authorities guaranteed depositors full access to their funds. Custodial dependence
            ultimately ties USDC's viability to the U.S. dollar.<sup class="fiat-money-note-ref"><a href="#fiat-money-note-5" aria-label="See note 5 on Silicon Valley Bank and USDC">[5]</a></sup></span>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr failure>
        <td number>
          <div wrapper>5</div>
        </td>
        <td component>
          <div wrapper>
            <div label>U.S. Dollar</div>
            <div>
              <DollarIcon class="w-16 inline-block" />
            </div>
          </div>
        </td>
        <td centralized No><div wrapper>No</div></td>
        <td description>
          <div wrapper>
            At the bottom of the stack lies the U.S. dollar. USDC cannot outlast the fiat it is pegged to. If the
            U.S. dollar collapses due to institutional, fiscal, or geopolitical crises, USDC's dollar backing loses
            its value with it. This reliance on a single underlying currency exposes USDC to all of the same single
            points of failure.
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <p>
      Investors normally expect compensation for taking on additional risk. Holding USDC alone provides no share of
      the income earned on its reserves. The GENIUS Act includes a ban on covered issuers paying interest or yield
      simply for holding, using, or retaining their stablecoins.<sup class="fiat-money-note-ref"><a href="#fiat-money-note-6" aria-label="See note 6 on the GENIUS Act interest provision">[6]</a></sup> As adoption grows, more digital commerce depends on
      this same chain of institutions. USDC brings dollars onto blockchains. Its resilience still ends where the
      dollar's does.
    </p>

    <h3 class="text-2xl font-bold mt-14">
      Dissecting The Argon Stack<sup class="fiat-money-note-ref"><a href="#fiat-money-note-7" aria-label="See note 7 on Argon protocol sources">[7]</a></sup>
    </h3>

    <p>
      Like Bitcoin, Argon is built on open-source software and a network of independent participants. Its resilience
      comes from distributing the work of running and stabilizing the currency across those participants.
    </p>

    <table class="mt-10">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Layer</th>
        <th scope="col">Resilience</th>
        <th scope="col">Explanation</th>
      </tr>
      </thead>
      <tbody>
      <tr success>
        <td number>
          <div wrapper>1
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Usage</div>
            <div>
              <USDCIcon class="h-12 inline-block" />
              <span class="font-bold pl-1"> =</span>
              <ShoppingIcon class="h-10 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized Yes><div wrapper>Yes</div></td>
        <td description>
          <div wrapper>
            Argon is designed for open, peer-to-peer transactions without relying on banks or card networks.
            Wallets, nodes, and marketplaces can be operated by anyone, enabling circulation across jurisdictions
            and platforms. If one wallet provider, exchange, or region goes offline, others continue serving users.
            That resilience in payments leads to the next question: what determines an Argon's value?
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr>
        <td number>
          <div wrapper>2
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Valuation</div>
            <div>
              <PriceIcon class="w-14 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized><div wrapper>Partial</div></td>
        <td description>
          <div wrapper>
            Argon sets a purchasing-power target using external inflation data. The target currently uses the U.S.
            Consumer Price Index as a measuring tool, and it is designed to be easily broadened into a global
            inflation basket. This will allow Argon to function as a global stablecoin through on-chain oracle
            mechanisms that operate independently of any single nation state. Market trading sets Argon's price, and
            the protocol creates incentives to bring that price toward its target. The current price-feed design
            still depends on an authorized oracle account.
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr success>
        <td number>
          <div wrapper>3
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Algorithm</div>
            <div>
              <CodeIcon class="w-12 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized Yes><div wrapper>Yes</div></td>
        <td description>
          <div wrapper>
            Like Bitcoin, Argon's protocol lives in open-source code that anyone can implement. Multiple client
            implementations can exist. If a development team stops maintaining the software, others can continue its
            work. Independent implementations must follow the same consensus rules to remain part of the same
            network. Miners and other node operators choose which implementation to run.
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr success>
        <td number>
          <div wrapper>4
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td component>
          <div wrapper>
            <div label>Miners</div>
            <div>
              <MinerIcon class="w-14 inline-block" />
            </div>
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
        <td centralized Yes><div wrapper>Yes</div></td>
        <td description>
          <div wrapper>
            Participation is permissionless. Operators join by running the software and meeting the protocol's
            requirements for a mining seat, including bids in Argons and a commitment of Argonots. Miners freely
            choose which client to run, while remaining bound by the consensus rules they enforce. If one
            jurisdiction shutters operators, miners from elsewhere will continue; difficulty and selection adjust,
            and block production proceeds.
            <div Arrow><ArrowIcon /></div>
          </div>
        </td>
      </tr>
      <tr success>
        <td number><div wrapper>5</div></td>
        <td component>
          <div wrapper>
            <div label>Bitcoin</div>
            <div>
              <BitcoinIcon class="w-16 inline-block" />
            </div>
          </div>
        </td>
        <td centralized Yes><div wrapper>Yes</div></td>
        <td description>
          <div wrapper>
            The core of Argon's price stabilization mechanism is its use of Bitcoin. Anyone can set up vaults,
            liquid lock bitcoins and provide stabilization capacity for the Argon network. Bitcoin holders have a
            financial reason to buy and burn Argons when doing so lets them recover their bitcoin at a discount.
            Each vault serves its own locks, while the network's stabilization capacity draws on independent
            operators and Bitcoin holders. This layered dependence around a decentralized base asset gives Argon's
            stack a resilient foundation, independent of any single government, bank, or company.
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <p>
      Argon is built to last for a thousand years. Its design distributes the work of running and stabilizing the
      currency across independent participants. This redundancy across software, geography, and entities gives the
      network ways to replace lost capacity. The goal is to carry that resilience through every layer, so Argon
      outlasts the participants and institutions that serve it. For more information, explore Argon's other core
      properties:
      <DocLink to="/docs/economic-pillars/protection-from-inflation">Protection from Inflation</DocLink> and
      <DocLink to="/docs/economic-pillars/recovery-from-death-spirals">Recovery from Death Spirals</DocLink>.
    </p>

    <section class="fiat-money-notes mt-12 border-t border-black/15 pt-6" aria-labelledby="fiat-money-notes-heading">
      <h3 id="fiat-money-notes-heading">Sources and Notes</h3>
      <p>
        The resilience ratings are this page's assessment of institutional dependence. “Yes” indicates that independent
        participants can continue the layer's work; “Partial” indicates a mix of distributed participation and institutional
        dependencies; “No” indicates reliance on the institution identified.
      </p>
      <ol class="list-decimal">
        <li id="fiat-money-note-1">
          <strong>From gold to fiat.</strong>
          Federal Reserve History describes the <a href="https://www.federalreservehistory.org/essays/bretton-woods-created">creation of the Bretton Woods system</a>
          and the <a href="https://www.federalreservehistory.org/essays/gold-convertibility-ends">end of dollar–gold convertibility in August 1971</a>.
          These accounts document the dollar's transition from a gold-convertible international monetary system to fiat.
        </li>
        <li id="fiat-money-note-2">
          <strong>Bitcoin's consensus and mining.</strong>
          The <a href="https://developer.bitcoin.org/devguide/block_chain.html">Bitcoin Developer Guide</a> explains
          independent block validation, consensus rules, issuance, proof of work, and the adjustment of mining difficulty.
          These mechanisms underpin the Bitcoin stack's technical discussion.
        </li>
        <li id="fiat-money-note-3">
          <strong>U.S. monetary institutions.</strong>
          The Federal Reserve explains its <a href="https://www.federalreserve.gov/faqs/about_12593.htm">governing structure and 12 regional Reserve Banks</a>.
          Federal Reserve History describes the dollar's place in the <a href="https://www.federalreservehistory.org/essays/bretton-woods-launched">postwar Bretton Woods system</a>.
          The table's conclusions about institutional and geopolitical resilience are this page's analysis.
        </li>
        <li id="fiat-money-note-4">
          <strong>USDC reserves and redemption.</strong>
          Circle's <a href="https://www.circle.com/transparency">reserve disclosures</a> describe the assets and institutions
          supporting USDC. Its <a href="https://www.circle.com/legal/usdc-terms">USDC Terms</a> explain redemption eligibility,
          the treatment of reserve income, and Circle's authority to block transfers involving specified addresses.
        </li>
        <li id="fiat-money-note-5">
          <strong>Silicon Valley Bank, March 2023.</strong> <a href="https://www.circle.com/pressroom/3-3-billion-of-usdc-reserve-risk-removed-dollar-de-peg-closes">Circle's contemporaneous announcement</a>
          identifies its $3.3 billion reserve deposit at Silicon Valley Bank and describes the closing of USDC's de-peg.
          The <a href="https://www.federalreserve.gov/newsevents/pressreleases/monetary20230312b.htm">March 12 joint statement from Treasury, the Federal Reserve, and the FDIC</a>
          confirms that all SVB depositors would have access to their funds beginning March 13, 2023.
        </li>
        <li id="fiat-money-note-6">
          <strong>The GENIUS Act and interest.</strong>
          Section 4(a)(11) of the <a href="https://www.govinfo.gov/content/pkg/PLAW-119publ27/html/PLAW-119publ27.htm">GENIUS Act, Public Law 119-27</a>,
          addresses interest or yield paid by permitted payment stablecoin issuers and foreign payment stablecoin issuers
          solely for holding, using, or retaining their stablecoins. Section 20 sets the Act's effective-date rules.
        </li>
        <li id="fiat-money-note-7">
          <strong>Argon's protocol and dependencies.</strong> <DocLink to="/docs/system-design">Architectural Basics</DocLink> and the
          <DocLink to="/docs/whitepapers/fundamentals">stability fundamentals whitepaper</DocLink> explain the purchasing-power target
          and stabilization incentives. The published <a href="https://github.com/argonprotocol/mainchain/blob/main/pallets/price_index/src/lib.rs">price-feed implementation</a>
          restricts submissions to a configured operator account, while the <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/run-a-miner.md">mining guide</a>
          describes how operators participate in the network.
        </li>
      </ol>
    </section>
  </DocContent>
</template>

<script setup lang="ts">
import BitcoinIcon from '../../../assets/apocalyptic/bitcoin.svg?component';
import DollarIcon from '../../../assets/apocalyptic/dollar.svg?component';
import PriceIcon from '../../../assets/apocalyptic/price.svg?component';
import ShoppingIcon from '../../../assets/apocalyptic/shopping.svg?component';
import MinerIcon from '../../../assets/apocalyptic/miner.svg?component';
import WorldMap from '../../../assets/apocalyptic/world.svg?component';
import CodeIcon from '../../../assets/apocalyptic/code.svg?component';
import FedIcon from '../../../assets/apocalyptic/fed.svg?component';
import CongressIcon from '../../../assets/apocalyptic/congress.svg?component';
import MilitaryIcon from '../../../assets/apocalyptic/military.svg?component';
import ArrowIcon from '../../../assets/apocalyptic/arrow.svg?component';
import CircleLogo from '../../../assets/apocalyptic/circle.svg?component';
import USDCIcon from '../../../assets/apocalyptic/usdc.svg?component';
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocLink from "@/screens/docs/DocLink.vue";

</script>

<style scoped>
@import "../../../main.css";

.fiat-money-note-ref {
  margin-left: 0.15em;
  font-family: var(--font-sans);
  font-size: 0.7em;
  font-weight: 400;
}

.fiat-money-notes > p,
.fiat-money-notes ol > li {
  color: rgb(0 0 0 / 65%);
  font-size: 0.875rem;
  line-height: 1.6;
  scroll-margin-top: 6rem;
}

table {
  @apply h-fit w-full table-fixed text-base;

  thead th {
    @apply pb-2 text-center text-sm leading-6 font-sans font-normal text-black/50;

    &:nth-child(1) {
      @apply text-center;
      width: 5%;
    }

    &:nth-child(2) {
      width: 20%;
    }

    &:nth-child(3) {
      width: 15%;
    }

    &:nth-child(4) {
      @apply px-6 text-start;
      width: 60%;
    }
  }

  tbody td {
    @apply border-t-0;
    vertical-align: top;
  }

  tr div[wrapper] {
    @apply relative border-t border-black/20 h-full py-7 flex items-center w-full;

    [Arrow] {
      @apply w-5 absolute -bottom-0.5 left-1/2 -translate-x-1/2 translate-y-1/2 text-slate-600/40 z-10;
      &:before {
        content: '';
        @apply absolute top-0 left-0.5 right-0.5 h-full -z-10;
        background: var(--bg-color);
      }
      &:after {
        content: '';
        @apply absolute top-0 left-0 w-full h-4 z-20;
        background: linear-gradient(to bottom, var(--bg-color) 0%, transparent 100%);
      }
    }
  }

  tr:last-child td {
    @apply border-b border-black/20;
  }

  tr {
    @apply h-full;
  }

  tr div[wrapper] {
    &:before {
      content: '';
      @apply bg-slate-500/5;
      @apply absolute top-3 bottom-3 left-0 right-0 -z-10;
    }
  }

  tr[success] div[wrapper] {
    &:before {
      content: '';
      @apply bg-lime-500/5;
    }
  }

  tr[failure] div[wrapper] {
    &:before {
      content: '';
      @apply bg-red-500/5;
    }
  }

  [number] {
    @apply relative text-center text-3xl text-black/30 font-bold;
    div[wrapper] {
      @apply relative justify-center h-full;
      &:after {
        @apply absolute right-0 top-2 bottom-2 w-px border-r border-black/15 border-dashed content-[''];
        content: '';
      }
    }
  }
  [component] {
    div[wrapper] {
      @apply flex flex-col items-center justify-center text-center text-black/70 h-full w-full px-3 gap-y-2;
      &:after {
        @apply absolute right-0 top-2 bottom-2 w-px border-r border-black/15 border-dashed content-[''];
      }
      > div:not([Arrow]) {
        :deep([fill="#000000"]),
        :deep([fill="black"]) {
          fill: currentColor;
        }
      }
    }
    [label] {
      @apply font-bold;
    }
  }
  [centralized] {
    @apply px-5 font-bold uppercase text-gray-500;
    & > div {
      @apply text-center justify-center;
    }
    &[No] {
      @apply text-red-600;
    }
    &[Yes] {
      @apply text-lime-600;
    }
    div[wrapper] {
      &:after {
        @apply absolute -right-2.5 top-2 bottom-2 w-px border-r border-black/15 border-dashed content-[''];
      }
    }
  }
  [description] div[wrapper] {
    @apply px-6 font-sans text-md leading-relaxed text-start text-black/70;
  }
}

</style>
